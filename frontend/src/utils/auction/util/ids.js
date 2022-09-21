import {
  PublicKey, 
  // AccountInfo 
} from '@solana/web3.js';

import { useLocalStorage } from './useLocalStorage';

const PubKeysInternedMap = new Map();

export const toPublicKey = (key) => {
  if (typeof key !== 'string') {
    return key;
  }

  let result = PubKeysInternedMap.get(key);
  if (!result) {
    result = new PublicKey(key);
    PubKeysInternedMap.set(key, result);
  }

  return result;
};

export const findProgramAddress = async (
  seeds,
  programId,
) => {
  const localStorage = useLocalStorage();
  const key =
    'pda-' +
    seeds.reduce((agg, item) => agg + item.toString('hex'), '') +
    programId.toString();
  const cached = localStorage.getItem(key);
  if (cached) {
    const value = JSON.parse(cached);

    return [value.key, parseInt(value.nonce)];
  }

  const result = await PublicKey.findProgramAddress(seeds, programId);

  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        key: result[0].toBase58(),
        nonce: result[1],
      }),
    );
  } catch {
    // ignore
  }

  return [result[0].toBase58(), result[1]];
};