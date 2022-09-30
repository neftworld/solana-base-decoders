import {
  ACCOUNT_SIZE,
  Mint,
  MintLayout,
  MINT_SIZE,
  MULTISIG_SIZE,
  TokenInvalidAccountSizeError,
  TokenInvalidMintError
} from "@solana/spl-token";

export enum AccountType {
  Uninitialized,
  Mint,
  Account,
}
export const ACCOUNT_TYPE_SIZE = 1;

export type MintInfo = Omit<Mint, "address">;

export const decodeMint = (data: Buffer) => {
  if (data.length !== MintLayout.span) {
    throw new Error("Not a valid Mint");
  }
  const mintInfo = MintLayout.decode(data.slice(0, MINT_SIZE));

  let tlvData = Buffer.alloc(0);
  if (data.length > MINT_SIZE) {
    if (data.length <= ACCOUNT_SIZE) throw new TokenInvalidAccountSizeError();
    if (data.length === MULTISIG_SIZE) throw new TokenInvalidAccountSizeError();
    if (data[ACCOUNT_SIZE] != AccountType.Mint)
      throw new TokenInvalidMintError();
    tlvData = data.slice(ACCOUNT_SIZE + ACCOUNT_TYPE_SIZE);
  }

  return {
    mintAuthority: mintInfo.mintAuthorityOption ? mintInfo.mintAuthority : null,
    supply: mintInfo.supply,
    decimals: mintInfo.decimals,
    isInitialized: mintInfo.isInitialized,
    freezeAuthority: mintInfo.freezeAuthorityOption
      ? mintInfo.freezeAuthority
      : null,
    tlvData,
  } as MintInfo;
};
