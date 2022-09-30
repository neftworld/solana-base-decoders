export const METADATA_PREFIX = "metadata";

import { PublicKey } from "@solana/web3.js";
import BN from "bn.js";
import { IAuctionProgramIds } from "./IAuctionProgramIds";

export const METAPLEX_PREFIX = "metaplex";

export const getStoreKey = async (
  storeOwnerWalletPublicKey: PublicKey,
  metaplexProgramId: PublicKey
) => {
  const programs = await PublicKey.findProgramAddress(
    [
      Buffer.from("metaplex"),
      new PublicKey(metaplexProgramId).toBuffer(),
      storeOwnerWalletPublicKey.toBuffer(),
    ],
    new PublicKey(metaplexProgramId)
  );
  const storeAddress = programs[0];

  return storeAddress;
};

export async function getAuctionManagerKey(
  vault: string,
  auctionKey: string,
  metaplexProgramId: PublicKey
): Promise<string> {
  return (
    await PublicKey.findProgramAddress(
      [Buffer.from(METAPLEX_PREFIX), new PublicKey(auctionKey).toBuffer()],
      new PublicKey(metaplexProgramId)
    )
  )[0].toBase58();
}

export function getMetadata(
  tokenMint: string,
  auctionProgramIds: IAuctionProgramIds
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [
      Buffer.from(METADATA_PREFIX),
      auctionProgramIds.metadataProgramId.toBuffer(),
      new PublicKey(tokenMint).toBuffer(),
    ],
    auctionProgramIds.metadataProgramId
  )[0];
}

export const getMasterEdition = async (
  mint: PublicKey,
  auctionProgramIds: IAuctionProgramIds
): Promise<PublicKey> => {
  return (
    await PublicKey.findProgramAddress(
      [
        Buffer.from(METADATA_PREFIX),
        auctionProgramIds.metadataProgramId.toBuffer(),
        mint.toBuffer(),
        Buffer.from("edition"),
      ],
      auctionProgramIds.metadataProgramId
    )
  )[0];
};
