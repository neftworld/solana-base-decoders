import { AccountInfo } from "@solana/web3.js";

export const convertAccountInfoToRawData = (
    accountInfo: AccountInfo<Buffer>
  ) => {
    return {
      data: [...accountInfo.data],
      owner: accountInfo.owner.toBase58
        ? accountInfo.owner.toBase58()
        : (accountInfo.owner as unknown as string),
      lamports: accountInfo.lamports,
      executable: accountInfo.executable,
      rentEpoch: accountInfo.rentEpoch,
    };
  };