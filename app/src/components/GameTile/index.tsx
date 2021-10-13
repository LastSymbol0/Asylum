import './style.scss';
import { Typography } from '@mui/material';


const GameTile = ({image}: {image: any}) => {

    return (
    <div className='gameItemWrapper'>
        <div className="game" style={{background: `url(${image})`}}>
            <div className="addButtton">
                <Typography variant="caption">Add</Typography>
            </div>
        </div>
    </div>
    ) 
}

export default GameTile;