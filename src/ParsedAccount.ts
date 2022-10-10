import { AccountInfo } from "@solana/web3.js";

export interface ParsedAccountBase {
    pubkey: string;
    account: AccountInfo<Buffer>;
    info: any; // TODO: change to unknown
  }
  
  export type AccountParser = (
    pubkey: string,
    data: AccountInfo<Buffer>
  ) => ParsedAccountBase | undefined;
  
  export interface ParsedAccount<T> extends ParsedAccountBase {
    info: T;
  }
  