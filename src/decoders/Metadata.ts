import { Metadata, UseMethod } from "@metaplex-foundation/mpl-token-metadata";
import { PublicKey } from "@solana/web3.js";


export class CreatorRoyaltyShare {
  address: string;
  verified: boolean;
  share: number;

  constructor(args: {
    address: string;
    verified: boolean;
    share: number;
  }) {
    this.address = args.address;
    this.verified = args.verified;
    this.share = args.share;
  }
}


export class Data {
  name: string;
  symbol: string;
  uri: string;
  sellerFeeBasisPoints: number;
  creators: CreatorRoyaltyShare[] | null;
  constructor(args: {
    name: string;
    symbol: string;
    uri: string;
    sellerFeeBasisPoints: number;
    creators: CreatorRoyaltyShare[] | null;
  }) {
    this.name = args.name;
    this.symbol = args.symbol;
    this.uri = args.uri;
    this.sellerFeeBasisPoints = args.sellerFeeBasisPoints;
    this.creators = args.creators;
  }
}


export type ParsedMetadata = {
  readonly updateAuthority: PublicKey;
  readonly mint: PublicKey;
  readonly data: Data;
  readonly primarySaleHappened: boolean;
  readonly isMutable: boolean;
  readonly editionNonce: number | null;
  readonly tokenStandard: number | null;
  readonly collection?: {
    verified: boolean;
    key: PublicKey;
  } | null;

  readonly uses?: {
    useMethod: UseMethod;
    remaining: string;
    total: string;
  } | null;
};

export const decodeMetadata = (buffer: Buffer): ParsedMetadata => {
  const raw = Metadata.deserialize(buffer)[0];
  return {
    ...raw,
    data: {
      ...raw.data,
      name: raw.data.name.replace(/\0/g, ""),
      uri: raw.data.uri.replace(/\0/g, ""),
      symbol: raw.data.symbol.replace(/\0/g, ""),
      creators:
        raw.data.creators?.map((c) => ({
          address: c.address.toBase58(),
          verified: c.verified,
          share: c.share,
        })) || null,

    },
    editionNonce: raw.editionNonce,
    tokenStandard: raw.tokenStandard,
    uses: raw.uses ? {
      ...raw.uses,
      remaining: raw.uses.remaining.toString(),
      total: raw.uses.total.toString(),
    } : null
  };
};