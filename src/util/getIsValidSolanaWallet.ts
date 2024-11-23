import { PublicKey } from "@solana/web3.js";

export function isValidSolanaWallet(address: string) {
  try {
    new PublicKey(address);
    return true; // If no error, it's a valid public key
  } catch (error) {
    return false; // Invalid public key
  }
}
