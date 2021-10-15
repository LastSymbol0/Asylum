import { Program } from "@project-serum/anchor"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { players, asylum } from '../../../lib'
import { PublicKey } from '@solana/web3.js'
import { fetchGamesNfts } from "../../../nft-store/games/thunks"

const fetchGamesCatalog = createAsyncThunk('games/fetchCatalog', async (program: Program) => {
    console.log("dewqdewfwefewfewfewfewfew")

    const [gamessAccountAddress, _] = await asylum.findGamesCatalogAccountAddress(program.programId)
    const account = await program.account.gamesCatalogAccount.fetch(gamessAccountAddress)
    console.log("dewqdewfwefewfewfewfewfew j ", account.games)

    return account.games as PublicKey[]
})

const fetchGamesCatalogAndLoadNfts = createAsyncThunk('games/fetchCatalogAndLoadNfts', async (program: Program, { dispatch }) => {
    const a = await dispatch(fetchGamesCatalog(program))

    if (a.payload)
        await dispatch(fetchGamesNfts({connection: program.provider.connection, mints: a.payload as PublicKey[]}))
})

export { fetchGamesCatalog, fetchGamesCatalogAndLoadNfts }