import './style.scss';
import gameExample from "./../../assets/gameExample.png";
import { Typography } from '@mui/material';


const GameTile = () => {

    return (
    <div className="game" style={{background: `url(${gameExample})`}}>
        <div className="addButtton">
            <Typography variant="caption">Add</Typography>
        </div>
    </div>
    ) 
}

export default GameTile;