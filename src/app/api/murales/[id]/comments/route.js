import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

function serverBaseUrl() {
  return process.env.SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL;
}

function internalSecret() {
  return process.env.COMMENT_INTERNAL_SECRET;
}

/**
 * Proxy seguro: solo usuarios con sesión NextAuth pueden publicar.
 * user / picture salen de la sesión en servidor; el cliente solo envía title y body.
 */
export async function POST(request, context) {
  const secret = internalSecret();
  if (!secret) {
    console.error(
      "COMMENT_INTERNAL_SECRET no está definido en el entorno del cliente Next.js"
    );
    return NextResponse.json(
      { error: true, message: "Configuración del servidor incompleta" },
      { status: 503 }
    );
  }

  const base = serverBaseUrl();
  if (!base) {
    return NextResponse.json(
      { error: true, message: "URL del API no configurada" },
      { status: 503 }
    );
  }

  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: true, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = context.params;
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: true, message: "Invalid id" }, { status: 400 });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: true, message: "Invalid JSON" }, { status: 400 });
  }

  const title = typeof payload.title === "string" ? payload.title.trim() : "";
  const body = typeof payload.body === "string" ? payload.body.trim() : "";
  if (!title || !body) {
    return NextResponse.json(
      { error: true, message: "Título y comentario son obligatorios" },
      { status: 400 }
    );
  }

  const user =
    session.user.name?.trim() ||
    session.user.email?.trim() ||
    "Usuario";
  const picture = session.user.image?.trim() || undefined;

  const upstream = `${base.replace(/\/$/, "")}/comment/${encodeURIComponent(id)}`;

  const backendRes = await fetch(upstream, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Internal-Comment-Key": secret,
    },
    body: JSON.stringify({
      user,
      title,
      body,
      ...(picture ? { picture } : {}),
    }),
  });

  let data;
  try {
    data = await backendRes.json();
  } catch {
    data = { error: true, message: "Respuesta inválida del servidor" };
  }

  return NextResponse.json(data, { status: backendRes.status });
}
