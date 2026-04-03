/**
 * Next.js en Windows puede devolver 404 en /_next/static/* si la ruta del
 * proyecto tiene espacios u otros caracteres especiales (issue vercel/next.js#48699).
 */
const cwd = process.cwd();
if (/\s/.test(cwd) || /[()&]/.test(cwd)) {
  console.warn(
    "\n\x1b[33m[Advertencia]\x1b[0m La ruta del proyecto tiene espacios o caracteres especiales:\n" +
      `  ${cwd}\n` +
      "  Eso suele provocar 404 en chunks/CSS de /_next/static/ y estilos que no cargan.\n" +
      "  Solución: mover el repo a una ruta corta sin espacios (ej. C:\\\\dev\\\\liston-rosa).\n"
  );
}
