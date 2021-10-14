import { Typography } from '@mui/material'
import GameItem from '../../components/GameItem'
import './style.scss'

import spaceShip1 from './../../assets/AnywayLose_Items/unit.png';
import spaceShip2 from './../../assets/AnywayLose_Items/unit2.png';
import spaceShip3 from './../../assets/AnywayLose_Items/unit3.png';
import spaceShip4 from './../../assets/AnywayLose_Items/unit4.png';
import helmet from './../../assets/Riot_Helmet.png';
import riot from './../../assets/Riot_Chestpiece.png';
import g1 from './../../assets/g 1.png';

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


const dummyItems = [
    {
        image: helmet,
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '200,50',
    },
    {
        image: riot,
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '1500,725',
    },
    {
        image: g1,
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '7,0',
    },
    {
        image: riot,
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '1500,725',
    },
    {
        image: helmet,
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '200,50',
    },

]

const InventoryPage = () => {
    return <div className='inventoryWrapper'>

    <div className='gameCategoryDivider'>
        <Typography className='deviderText'>All items</Typography>
    </div>
        
        <div className='inventoryBlock'>
            {anywayLoseItems.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}
            {dummyItems.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}
            
            

        </div>

        <div className='gameCategoryDivider'>
            <Typography className='deviderText'>Items from game “AnywayLose”</Typography>
        </div>

        <div className='inventoryBlock'>

            {anywayLoseItems.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}

        </div>

        <div className='gameCategoryDivider'>
            <Typography className='deviderText'>Items from game “Your favorite shooter”</Typography>
        </div>

        <div className='inventoryBlock'>

            {dummyItems.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}
            {dummyItems.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}

        </div>

    </div>
}

export { InventoryPage }