import helmet from './../../assets/item_ex_1.png';
import Chestpiece from './../../assets/item_ex_4.png';
import blade from './../../assets/item_ex_3.png';
import arrows from './../../assets/item_ex_2.png';
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
        image: blade,
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
        name: 'Bow and arrows',
        description: "Classic",
        image: arrows,
        price: 5.45
    }
]
