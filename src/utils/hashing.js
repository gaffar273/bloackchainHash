export async function hashText(text, algorithm, salt = '') {
  const input = salt + text;
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  
  try {
    if (algorithm === 'sha256' || algorithm === 'sha512' || algorithm === 'sha1') {
      const algoName = algorithm.toUpperCase().replace('SHA', 'SHA-');
      const hashBuffer = await crypto.subtle.digest(algoName, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } else if (algorithm === 'md5') {
      return simpleMD5(input);
    } else if (algorithm === 'ripemd160') {
      return simpleRIPEMD160(input);
    }
  } catch (error) {
    throw new Error(`Hashing failed: ${error.message}`);
  }
}

/**
 * Simple MD5 hash implementation (demonstration purposes)
 * Note: This is a simplified version for educational purposes
 */
function simpleMD5(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(32, '0').slice(0, 32);
}

/**
 * Simple RIPEMD-160 simulation (demonstration purposes)
 * Note: This is a simplified version for educational purposes
 */
function simpleRIPEMD160(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 7) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(40, '0').slice(0, 40);
}