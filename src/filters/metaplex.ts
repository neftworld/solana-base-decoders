import bs58 from "bs58";

export const MAX_PRIZE_TRACKING_TICKET_SIZE = 1 + 32 + 8 + 8 + 8 + 50;
export const MAX_WHITELISTED_CREATOR_SIZE = 2 + 32 + 10;
export const MAX_PAYOUT_TICKET_SIZE = 1 + 32 + 8;

export enum MetaplexKey {
  Uninitialized = 0,
  OriginalAuthorityLookupV1 = 1,
  BidRedemptionTicketV1 = 2,
  StoreV1 = 3,
  WhitelistedCreatorV1 = 4,
  PayoutTicketV1 = 5,
  SafetyDepositValidationTicketV1 = 6,
  AuctionManagerV1 = 7,
  PrizeTrackingTicketV1 = 8,
  SafetyDepositConfigV1 = 9,
  AuctionManagerV2 = 10,
  BidRedemptionTicketV2 = 11,
  AuctionWinnerTokenTypeTrackerV1 = 12,
  StoreIndexerV1 = 13,
  AuctionCacheV1 = 14,
  PackSet = 15,
}

export const buildMetaplexStoreFilter = (storeId: string) => {
  return {
    memcmp: {
      offset: 1,
      bytes: storeId,
    },
  };
};

export const buildMetaplexAuthorityFilter = (authorityId: string) => {
  return {
    memcmp: {
      offset: 1 + 32,
      bytes: authorityId,
    },
  };
};

export const buildMetaplexKeyFilter = (key: MetaplexKey) => {
  return {
    memcmp: {
      offset: 0,
      bytes: bs58.encode(Buffer.from([key])),
    },
  };
};
