/**
 * Converts a string to a hexadecimal color value.
 * @param {string} input - The input string to convert. 
 * @returns {string} The hexadecimal color value.
 * @description
 - Hashes the input string to generate a numeric value.
- Ensures the value is positive.
- Converts the numeric value to a hexadecimal color string prefixed with #.
- Pads the hexadecimal string to length 6 with leading 0s.
*/
export function stringToHexColor(input: string): string {
  // Simple hash function to convert string to a numeric value
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    hash = (hash << 5) - hash + input.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }

  // Ensure the value is positive
  hash = Math.abs(hash);

  // Generate hex color using the numeric value
  const hexColor = '#' + (hash % 0xFFFFFF).toString(16).padStart(6, '0');

  return hexColor;
}