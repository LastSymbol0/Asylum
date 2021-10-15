import { Typography } from '@mui/material'

import sol from './../../assets/sol.svg';
import './style.scss'

const GameItem = ({image, itemName, gameName, price} : { image: any, itemName: string, gameName: string, price: string }) => {
    return (
        <div className='gameItemBox'>
                <div className='gameItem'>
                    <img className='itemImage' alt='item' src={image} />
                    <div className='hoverBox'>
                        <Typography>View on blockchain</Typography>
                    </div>
                    <div className="SellButton"><Typography variant="caption">Sell</Typography></div>
                </div>
                <Typography className="itemName">{itemName}</Typography>
                <div className='dataBox'>
                    <Typography className='name'>{gameName}</Typography>
                    <Typography className="price">{price}
                        <img className='solSymbol' src={sol} alt='sol'/>
                    </Typography>
                </div>
        </div>
    )
}

export default GameItem;