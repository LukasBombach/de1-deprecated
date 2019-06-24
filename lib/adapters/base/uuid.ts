export type UUID = string | number;

export function getCanonicalUUID(uuid: UUID): string {
  if (typeof uuid === "number") uuid = uuid.toString(16);
  uuid = uuid.toLowerCase();
  if (uuid.length <= 8)
    uuid = ("00000000" + uuid).slice(-8) + "-0000-1000-8000-00805f9b34fb";
  if (uuid.length === 32)
    uuid = uuid
      .match(
        /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/
      )
      .splice(1)
      .join("-");
  return uuid;
}
