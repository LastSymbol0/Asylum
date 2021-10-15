import GameTile from '../../components/GameTile';
import './style.scss'

import anywayLoseCover from "./../../assets/AnywayLoseCover2.png";
import gameExample from "./../../assets/gameExample.png";
import gameExample1 from "./../../assets/game21.png";
import gameExample2 from "./../../assets/game2.png";
import gameExample3 from "./../../assets/Rectangle24.png";
import gameExample4 from "./../../assets/Rectangle21.png";
import { Typography } from '@material-ui/core';

const gamePosters = [gameExample, gameExample1, gameExample2, gameExample3, gameExample4]


const LibraryPage = () => {
    const anywayLoseTile = <GameTile
        image={anywayLoseCover}
        isAdded
        onLaunch={() => window?.open("http://localhost:8000/Asylum_AnywayLose", '_blank')?.focus()} />

    const tilesWithRealGame = gamePosters.map((item, i) => i === 0
        ? anywayLoseTile
        : <GameTile image={item} isAdded />)


    return (
    <div className="libraryWrapper">

        <div className='libraryHeader'>
            <Typography className='libraryHeaderText'>My games</Typography>
        </div>
        <div className="gamesList">

            {
                tilesWithRealGame
            }

        </div>
    </div>)
}

export { LibraryPage }