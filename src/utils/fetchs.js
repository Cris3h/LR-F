import axios from "axios";

function isApiEnvelope(value) {
  return (
    value &&
    typeof value === "object" &&
    Object.prototype.hasOwnProperty.call(value, "error") &&
    Object.prototype.hasOwnProperty.call(value, "data")
  );
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}



export async function fetchMainObj() {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const { data } = await axios(`${serverURL}/artwork`);

    if (!isApiEnvelope(data)) return [true];
    if (data.error) return [true];

    const objs = asArray(data.data);
    return [false, ...objs];
  } catch (e) {
    console.error(`error message ${e}`);
    return [true];
  }
}

export async function fetchSingleArtWork(id) {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL;
  try {
    const { data } = await axios(`${serverURL}/artwork/${id}`);

    if (!isApiEnvelope(data)) return [true, null];
    if (data.error) return [true, null];

    return [false, data.data ?? null];
  } catch (e) {
    console.error(`error message ${e}`);
    return [true, null];
  }
}
