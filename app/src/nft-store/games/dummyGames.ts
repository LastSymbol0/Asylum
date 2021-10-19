import { Keypair, PublicKey } from '@solana/web3.js';
import gameExample2 from "./../../assets/game2.png";
import gameExample1 from "./../../assets/game21.png";
import gameExample from "./../../assets/gameExample.png";
import gamePlaceholder1 from './../../assets/gamePlaceholder1.png';
import gamePlaceholder2 from './../../assets/gamePlaceholder2.png';
import gameExample7 from "./../../assets/Rectangle2.png";
import gameExample4 from "./../../assets/Rectangle21.png";
import gameExample5 from "./../../assets/Rectangle22.png";
import gameExample6 from "./../../assets/Rectangle23.png";
import gameExample3 from "./../../assets/Rectangle24.png";
import gameExample8 from "./../../assets/Rectangle25.png";
import gameExample9 from "./../../assets/Rectangle26.png";
import bannerGame1 from './../../assets/wots_wide.png';
import wotsH from './../../assets/wotsH.jpg';
import bannerGame2 from './../../assets/AL_gameplay.png';
import bannerGame3 from './../../assets/wots_wide_logo.png';
import { GameNftData } from "./gamesNftStore";

export const catalogGames = [
    { img: gameExample, publicKey: Keypair.generate().publicKey },
    // { img: gameExample1, publicKey: Keypair.generate().publicKey },
    // { img: gameExample2, publicKey: Keypair.generate().publicKey },
    // { img: gameExample3, publicKey: Keypair.generate().publicKey },
    // { img: gameExample4, publicKey: Keypair.generate().publicKey },
    // { img: gameExample5, publicKey: Keypair.generate().publicKey },
    // { img: gameExample6, publicKey: Keypair.generate().publicKey },
    // { img: gameExample7, publicKey: Keypair.generate().publicKey },
    // { img: gameExample8, publicKey: Keypair.generate().publicKey },
    // { img: gameExample9, publicKey: Keypair.generate().publicKey },
    // { img: gameExample, publicKey: Keypair.generate().publicKey },
    // { img: gameExample1, publicKey: Keypair.generate().publicKey },
    // { img: gameExample2, publicKey: Keypair.generate().publicKey },
    // { img: gameExample3, publicKey: Keypair.generate().publicKey },
    // { img: gameExample4, publicKey: Keypair.generate().publicKey },
    // { img: gameExample5, publicKey: Keypair.generate().publicKey },
    // { img: gameExample6, publicKey: Keypair.generate().publicKey },
    // { img: gameExample7, publicKey: Keypair.generate().publicKey },
    // { img: gameExample8, publicKey: Keypair.generate().publicKey },
    // { img: gameExample9, publicKey: Keypair.generate().publicKey },
    // { img: gameExample, publicKey: Keypair.generate().publicKey },
    // { img: gameExample1, publicKey: Keypair.generate().publicKey },
    // { img: gameExample2, publicKey: Keypair.generate().publicKey },
    // { img: gameExample3, publicKey: Keypair.generate().publicKey },
    // { img: gameExample4, publicKey: Keypair.generate().publicKey },
    // { img: gameExample5, publicKey: Keypair.generate().publicKey },
    // { img: gameExample6, publicKey: Keypair.generate().publicKey },
    // { img: gameExample7, publicKey: Keypair.generate().publicKey },
    // { img: gameExample8, publicKey: Keypair.generate().publicKey },
    // { img: gameExample9, publicKey: Keypair.generate().publicKey },
]
export const friendsPlayGame = { publicKey: Keypair.generate().publicKey, img: wotsH }
export const suggestedForYouGame = { publicKey: Keypair.generate().publicKey, img: wotsH }
export const bannerGames = [
    { publicKey: Keypair.generate().publicKey, img: bannerGame1 },
    { publicKey: Keypair.generate().publicKey, img: bannerGame3 },
    { publicKey: Keypair.generate().publicKey, img: bannerGame1 },
]

export const dummyGames: GameNftData[] = [
    // ...catalogGames.map((x, i) => {
    //     return {
    //         address: x.publicKey,
    //         title: "Game dummy" + i,
    //         description: "This is a dummy game description. ".repeat(10),
    //         cover: x.img,
    //         launchUrl: "",
    //         images: [x.img, x.img, x.img, x.img, x.img],
    //         tokenMint: PublicKey.default,
    //         itemsMint: [PublicKey.default],
    //         validationLevel: 1,
    //     }
    // }),
    {
        address: friendsPlayGame.publicKey,
        title: "Game dummy",
        description: "This is a dummy game description. ".repeat(10),
        cover: friendsPlayGame.img,
        launchUrl: "",
        images: [friendsPlayGame.img, friendsPlayGame.img, friendsPlayGame.img],
        tokenMint: PublicKey.default,
        itemsMint: [PublicKey.default],
        validationLevel: 1,
    },
    {
        address: suggestedForYouGame.publicKey,
        title: "Game dummy",
        description: "This is a dummy game description. ".repeat(10),
        cover: suggestedForYouGame.img,
        launchUrl: "",
        images: [suggestedForYouGame.img, suggestedForYouGame.img, suggestedForYouGame.img],
        tokenMint: PublicKey.default,
        itemsMint: [PublicKey.default],
        validationLevel: 1,
    },
    ...bannerGames.map((x, i) => {
        return {
            address: x.publicKey,
            title: "Game dummy",
            description: "This is a dummy game description. ".repeat(10),
            cover: x.img,
            launchUrl: "",
            images: [x.img, x.img, x.img],
            tokenMint: PublicKey.default,
            itemsMint: [PublicKey.default],
            validationLevel: 1,
        }
    })
];