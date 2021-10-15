import { Program } from "@project-serum/anchor"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { players } from '../../../lib'
import { PublicKey } from '@solana/web3.js'
import { fetchGamesNfts } from "../../../nft-store/games/thunks"

const fetchGamesLibrary = createAsyncThunk('games/fetchLibrary', async ({player, program}
    : {player: PublicKey ,program: Program}) => {
    const [playerAccountAddress, _] = await players.findPlayerGlobalAccountAddress(player, program.programId)
    const account = await program.account.playerAccount.fetch(playerAccountAddress)
    console.log("player games ", account.games)

    return account.games as PublicKey[]
})

const fetchGamesLibraryAndLoadNfts = createAsyncThunk('games/fetchCatalogAndLoadNfts', async ({player, program}
    : {player: PublicKey ,program: Program},
    { dispatch }) => {
    const a = await dispatch(fetchGamesLibrary({player, program}))

    if (a.payload)
        await dispatch(fetchGamesNfts({connection: program.provider.connection, mints: a.payload as PublicKey[]}))
})

export { fetchGamesLibrary, fetchGamesLibraryAndLoadNfts }