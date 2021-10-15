/// <reference types="node" />
import { MintInfo } from '@solana/spl-token';
import { TokenAccount } from './../models';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { TokenInfo } from '@solana/spl-token-registry';
export declare type KnownTokenMap = Map<string, TokenInfo>;
export declare const formatPriceNumber: Intl.NumberFormat;
export declare function useLocalStorageState(key: string, defaultState?: string): any[];
export declare const findProgramAddress: (seeds: (Buffer | Uint8Array)[], programId: PublicKey) => Promise<[string, number]>;
export declare function shortenAddress(address: string, chars?: number): string;
export declare function getTokenName(map: KnownTokenMap, mint?: string | PublicKey, shorten?: boolean): string;
export declare function getVerboseTokenName(map: KnownTokenMap, mint?: string | PublicKey, shorten?: boolean): string;
export declare function getTokenByName(tokenMap: KnownTokenMap, name: string): TokenInfo | null;
export declare function getTokenIcon(map: KnownTokenMap, mintAddress?: string | PublicKey): string | undefined;
export declare function isKnownMint(map: KnownTokenMap, mintAddress: string): boolean;
export declare const STABLE_COINS: Set<string>;
export declare function chunks<T>(array: T[], size: number): T[][];
export declare function toLamports(account?: TokenAccount | number, mint?: MintInfo): number;
export declare function wadToLamports(amount?: BN): BN;
export declare function fromLamports(account?: TokenAccount | number | BN, mint?: MintInfo, rate?: number): number;
export declare const tryParseKey: (key: string) => PublicKey | null;
export declare const formatAmount: (val: number, precision?: number, abbr?: boolean) => string;
export declare function formatTokenAmount(account?: TokenAccount | number | BN, mint?: MintInfo, rate?: number, prefix?: string, suffix?: string, precision?: number, abbr?: boolean): string;
export declare const formatUSD: Intl.NumberFormat;
export declare const formatNumber: {
    format: (val?: number | undefined) => string;
};
export declare const formatPct: Intl.NumberFormat;
export declare function convert(account?: TokenAccount | number, mint?: MintInfo, rate?: number): number;
export declare function sleep(ms: number): Promise<void>;
//# sourceMappingURL=utils.d.ts.map