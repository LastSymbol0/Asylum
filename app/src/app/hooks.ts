import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, Program, Idl, Wallet } from '@project-serum/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import playersIdl from '../idl/players.json'
import asylumIdl from '../idl/asylum.json'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAnchorProvider = (network: string = "https://api.devnet.solana.com", allowWithoutWallet: boolean = false) => {
    const wallet = useAnchorWallet()

    const connection = new Connection(network, "processed")

    if (!wallet)
    {
      if (allowWithoutWallet)
        return new Provider(
          // @ts-ignore
          connection, undefined, { preflightCommitment: "processed" },
        )
      return
    }

    const provider = new Provider(
      connection, wallet, { preflightCommitment: "processed" },
    )
    return provider;
}

export const playersProgramID = new PublicKey(playersIdl.metadata.address)
export const usePlayersProgram = (network: string = "https://api.devnet.solana.com", allowWithoutWallet: boolean = false) => {
    const provider = useAnchorProvider(network, allowWithoutWallet)

    if (!provider)
      return

    return new Program(playersIdl as Idl, playersProgramID, provider);
}

export const asylumProgramID = new PublicKey(asylumIdl.metadata.address)
export const useAsylumProgram = (network: string = "https://api.devnet.solana.com", allowWithoutWallet: boolean = false) => {
    const provider = useAnchorProvider(network, allowWithoutWallet)

    if (!provider)
      return

    return new Program(asylumIdl as Idl, asylumProgramID, provider);
}
