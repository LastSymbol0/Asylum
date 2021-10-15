import { Typography } from '@mui/material'
import { PublicKey } from '@solana/web3.js'
import GameItem from '../../components/GameItem'
import './style.scss'

import spaceShip1 from './../../assets/AnywayLose_Items/unit.png';
import spaceShip2 from './../../assets/AnywayLose_Items/unit2.png';
import spaceShip3 from './../../assets/AnywayLose_Items/unit3.png';
import spaceShip4 from './../../assets/AnywayLose_Items/unit4.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ItemState, selectNftItems } from '../../nft-store/items/itemsNftStoreSlice';
import { GameState, selectNftGames } from '../../nft-store/games/gamesNftStore';

const anywayLoseItems = [
    {
        image: spaceShip1,
        itemName: 'Newbie\'s ship',
        gameName: 'Anyway Lose',
        price: '1,50',
    },
    {
        image: spaceShip2,
        itemName: 'Standard space traveler',
        gameName: 'Anyway Lose',
        price: '1,725',
    },
    {
        image: spaceShip3,
        itemName: 'Double destroyer',
        gameName: 'Anyway Lose',
        price: '3,0',
    },
    {
        image: spaceShip4,
        itemName: 'The Ship of the Infinite War',
        gameName: 'Anyway Lose',
        price: '15,725',
    },
]

const getGameItem = (key: PublicKey, data: Record<string, ItemState>, gamesData: Record<string, GameState>) => {
    var itemData = data[key.toString()]

    var img: string;
    var name: string;
    var price: number;
    var game: any;

    switch (itemData.status) {
        case 'failed':
            img = "<failed>";
            name = "<failed>";
            price = 0;
            break;
        case 'inProgress':
            img = "";
            name = "";
            price = 0;
            break;
        case 'loaded':
            img = itemData.item?.image as string;
            name = itemData.item?.name as string;
            price = itemData.item?.price as number;
            const gameId = itemData.item?.game.toString() 
            game = gameId ? gamesData[gameId]?.game : undefined
            break;
        default:
            img = "";
            name = "";
            price = 0;
            break;
    }


    return <GameItem 
        image={img}
        itemName={name}
        gameName={game?.title ?? ""}
        price={price.toString()}
    />
}


const InventoryPage = () => {
    const allItemsCategorised = useSelector((state: RootState) => state.inventoryPage.itemsByGames)

    const allItems = ([] as PublicKey[]).concat(...(allItemsCategorised.map(x => x.items)))
    const allGames = ([] as PublicKey[]).concat(...(allItemsCategorised.map(x => x.gameId)))
    const itemsData = useSelector((state: RootState) => selectNftItems(state, allItems))
    const gamesData = useSelector((state: RootState) => selectNftGames(state, allGames))



    return (
    <div className='inventoryWrapper'>

        <div className='gameCategoryDivider'>
            <Typography className='deviderText'>All items</Typography>
        </div>
        <div className='inventoryBlock'>
            {allItems.map(item => getGameItem(item, itemsData, gamesData))}
        </div>


        {allItemsCategorised.map(item => {
            const game = gamesData[item.gameId.toString()]?.game

            return (
            <>
                <div className='gameCategoryDivider'>
                    <Typography className='deviderText'>Items from game “{game?.title ?? ""}”</Typography>
                </div>

                <div className='inventoryBlock'>
                    {allItems.map(item => getGameItem(item, itemsData, gamesData))}
                </div>
            </>
            )
        })}
    </div>)
}

export { InventoryPage }