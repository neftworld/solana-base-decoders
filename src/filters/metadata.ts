import bs58 from "bs58";

export const MAX_NAME_LENGTH = 32;
export const MAX_URI_LENGTH = 200;
export const MAX_SYMBOL_LENGTH = 10;
export const MAX_CREATOR_LIMIT = 5;
export const MAX_CREATOR_LEN = 32 + 1 + 1;

export enum MetadataKey {
  Uninitialized = 0,
  MetadataV1 = 4,
  EditionV1 = 1,
  MasterEditionV1 = 2,
  MasterEditionV2 = 6,
  EditionMarker = 7,
}

export const buildMetadataUpdateAuthorityFilter = (
  updateAuthorityKey: string
) => {
  return {
    memcmp: {
      offset: 1,
      bytes: updateAuthorityKey,
    },
  };
};

export const buildMetadataMintFilter = (mintKey: string) => {
  return {
    memcmp: {
      offset: 1 + 32,
      bytes: mintKey,
    },
  };
};

export const buildMetadataCreatorFilter = (
  creatorKey: string,
  creatorPosition: number
) => {
  return {
    memcmp: {
      offset:
        1 + // key
        32 + // update auth
        32 + // mint
        4 + // name string length
        MAX_NAME_LENGTH + // name
        4 + // uri string length
        MAX_URI_LENGTH + // uri
        4 + // symbol string length
        MAX_SYMBOL_LENGTH + // symbol
        2 + // seller fee basis points
        1 + // whether or not there is a creators vec
        4 + // creators vec length
        creatorPosition * MAX_CREATOR_LEN,
      bytes: creatorKey,
    },
  };
};

export const buildMetadataAssetTypeFilter = () => {
  return {
    memcmp: {
      offset: 0,
      bytes: bs58.encode(Buffer.from([MetadataKey.MetadataV1])),
    },
  };
};
