export function array2String(data) {
    Array.isArray(data)
      ? data.toString()
      : data;
}