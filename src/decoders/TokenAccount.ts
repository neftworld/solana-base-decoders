import { Account, AccountLayout, AccountState } from "@solana/spl-token";
import {PublicKey} from "@solana/web3.js"

export const WRAPPED_SOL_MINT = new PublicKey(
  "So11111111111111111111111111111111111111112"
);


export const decodeTokenAccount = (data: Buffer) => {
  const accountInfo = AccountLayout.decode(data);
  
  return {
    mint: accountInfo.mint,
    owner: accountInfo.owner,
    amount: accountInfo.amount,
    delegate: accountInfo.delegateOption ? accountInfo.delegate : null,
    delegatedAmount: accountInfo.delegatedAmount,
    isInitialized: accountInfo.state !== AccountState.Uninitialized,
    isFrozen: accountInfo.state === AccountState.Frozen,
    isNative: !!accountInfo.isNativeOption,
    rentExemptReserve: accountInfo.isNativeOption ? accountInfo.isNative : null,
    closeAuthority: accountInfo.closeAuthorityOption
      ? accountInfo.closeAuthority
      : null,
  } as TokenAccount;
  // return accountInfo;
};

export type TokenAccount = Omit<Account, 'address'>
