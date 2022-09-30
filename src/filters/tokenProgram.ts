import bs58 from "bs58";

export const buildTokenAccountMintFilter = (mintId: string) => {
  return {
    memcmp: {
      offset: 0,
      bytes: mintId,
    },
  };
};

export const buildTokenAccountOwnerFilter = (ownerId: string) => {
  return {
    memcmp: {
      offset: 32, /// the owner
      bytes: ownerId,
    },
  };
};

export const buildTokenAccountAmountFilter = (amount: number) => {
  return {
    memcmp: {
      offset: 32 + 32, /// the amount
      bytes: bs58.encode(Buffer.from([amount])),
    },
  };
};
