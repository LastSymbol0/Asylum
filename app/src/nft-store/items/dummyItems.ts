import helmet from './../../assets/Riot_Helmet.png';
import Chestpiece from './../../assets/Riot_Chestpiece.png';
import g1 from './../../assets/g 1.png';
import { ItemNftData } from './itemsNftStoreSlice'
import { Keypair } from '@solana/web3.js'
import { friendsPlayGame } from '../games/dummyGames';

export const dummyItems: ItemNftData[] = [
    {
        address: Keypair.generate().publicKey,
        game: friendsPlayGame.publicKey,
        name: 'Helmet',
        description: "Common helmet for common variors",
        image: helmet,
        price: 5.45
    },
    {
        address: Keypair.generate().publicKey,
        game: friendsPlayGame.publicKey,
        name: 'Chestpiece',
        description: "Just a chestpiece",
        image: Chestpiece,
        price: 10.2
    },
    {
        address: Keypair.generate().publicKey,
        game: friendsPlayGame.publicKey,
        name: 'Blade',
        description: "Looks like a weapon, but I'm not sure",
        image: g1,
        price: 3
    },
    {
        address: Keypair.generate().publicKey,
        game: friendsPlayGame.publicKey,
        name: 'Chestpiece',
        description: "Just a chestpiece",
        image: Chestpiece,
        price: 10.2
    },
    {
        address: Keypair.generate().publicKey,
        game: friendsPlayGame.publicKey,
        name: 'Helmet',
        description: "Common helmet for common variors",
        image: helmet,
        price: 5.45
    }
]
