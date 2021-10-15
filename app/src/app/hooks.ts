import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';

import { Connection, PublicKey } from '@solana/web3.js'
import { Provider, Program, Idl } from '@project-serum/anchor'
import { useAnchorWallet } from '@solana/wallet-adapter-react';
import playersIdl from '../idl/players.json'
import asylumIdl from '../idl/asylum.json'


// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAnchorProvider = (network: string = "https://api.devnet.solana.com") => {
    const wallet = useAnchorWallet()

    if (!wallet)
      return

    const connection = new Connection(network, "processed")

    const provider = new Provider(
      connection, wallet, { preflightCommitment: "processed" },
    )
    return provider;
}

export const playersProgramID = new PublicKey(playersIdl.metadata.address)
export const usePlayersProgram = (network: string = "https://api.devnet.solana.com") => {
    const provider = useAnchorProvider(network)

    if (!provider)
      return

    return new Program(playersIdl as Idl, playersProgramID, provider);
}

export const asylumProgramID = new PublicKey(asylumIdl.metadata.address)
export const useAsylumProgram = (network: string = "https://api.devnet.solana.com") => {
    const provider = useAnchorProvider(network)

    if (!provider)
      return

    return new Program(asylumIdl as Idl, asylumProgramID, provider);
}
