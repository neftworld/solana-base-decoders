import {PublicKey} from "@solana/web3.js";

export interface IAuctionProgramIds {
    tokenProgramId: PublicKey,
    auctionProgramId: PublicKey,
    metaplexProgramId: PublicKey,
    vaultProgramId: PublicKey,
    metadataProgramId: PublicKey,
}