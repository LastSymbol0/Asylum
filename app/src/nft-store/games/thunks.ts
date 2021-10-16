import { Program } from "@project-serum/anchor"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { PublicKey, Connection } from '@solana/web3.js'
import { decodeMasterEdition, decodeMetadata, getMetadata } from 'oyster-common'
import { fetchNft } from '../helpers'
import { GameNftData } from "./gamesNftStore"

const fetchGamesNfts = createAsyncThunk('games/fetchNfts', async ({connection, mints}
    : {connection: Connection, mints: PublicKey[]}) => {

    return Promise.all(mints.map(async (mint) => {
        try {
            const data = await fetchNft(connection, mint)

            const gameNft: GameNftData = {
                address: new PublicKey(data.mint),
                title: data.data.name,
                description: data.jsonData.description,
                cover: data.jsonData.image,
                launchUrl: data.jsonData.properties.launch_url,
                images: data.jsonData.properties.images_links,
                tokenMint: data.jsonData.properties.token_mint_account,
                itemsMint: data.jsonData.properties.items_mint_accounts,
                validationLevel: data.jsonData.properties.validation_level,
            }
            return {ok: true, mint: mint, game: gameNft}
        } catch (e) {
            return {ok: false, mint: mint, game: null}
        }
    }))
})

export { fetchGamesNfts }