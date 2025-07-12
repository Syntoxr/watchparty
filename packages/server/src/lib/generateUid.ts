import { customAlphabet } from "nanoid";

const alphabet = "abcdefghijklmnopqestuvwxyz";
const decimals = "0123456789";

/**
 *
 * @param rooms map of current rooms
 * @returns not yet used uid
 */
export function generateUid(rooms: Map<string, Set<string>>) {
  const nanoid = customAlphabet(alphabet + alphabet.toUpperCase() + decimals);
  let newId = nanoid(6);

  while (rooms.has(newId)) {
    let newId = nanoid(6);
  }

  return newId;
}
