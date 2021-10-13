import { Typography } from '@mui/material'
import GameItem from '../../components/GameItem'
import './style.scss'

import helmet from './../../assets/Riot_Helmet.png';
import riot from './../../assets/Riot_Chestpiece.png';
import g1 from './../../assets/g 1.png';

const items = [
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
        
        <div className='inventoryBlock'>
            {items.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}
            {items.map((item, i) => 
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

            {items.map((item, i) => 
                 <GameItem 
                    image={item.image}
                    itemName={item.itemName}
                    gameName={item.gameName}
                    price={item.price}
                />
            )}
            {items.map((item, i) => 
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