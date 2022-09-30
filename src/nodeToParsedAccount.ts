
import { PublicKey, AccountInfo } from "@solana/web3.js";

export type IRawData = {
    data: number[],
    owner: string,
    rentEpoch?: number,
    lamports: number,
    executable: boolean
  }
  
  

type propertiesType = IRawData | null | undefined;

export type ParsedAccountType<T> = {
  info: T;
  account: AccountInfo<any>;
  pubkey: string;
};

export const nodeToParsedAccount = <T>(
  id: string,
  rawData: propertiesType,
  decoder: (buffer: Buffer) => T
): ParsedAccountType<T> | null | undefined => {
  try {
    if( !rawData ) {
      return rawData /// handles undefined and null
    }

    const decodedData = decoder(Buffer.from(rawData.data));

    return {
      info: decodedData,
      account: {
        ...rawData,
        owner: new PublicKey(rawData.owner),
        data: Buffer.from(rawData.data),
      },
      pubkey: id,
    };
  } catch (e) {
    return undefined;
  }
};

export const accountToParsedAccount = <T>(
  id: string,
  accountInfo: AccountInfo<Buffer>,
  decoder: (buffer: Buffer) => T
): ParsedAccountType<T> | undefined => {
  try {
    const decodedData = decoder(Buffer.from(accountInfo.data));

    return {
      info: decodedData,
      account: accountInfo,
      pubkey: id,
    };
  } catch (e) {
    return undefined;
  }
};