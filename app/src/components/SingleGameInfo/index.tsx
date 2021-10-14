import './style.scss';
import { Typography } from '@mui/material';

import redDeadCover from './../../assets/redDeadCover.png';
import redDeadImage1 from './../../assets/redDeadImage1.png';
import redDeadImage2 from './../../assets/redDeadImage2.png';
import redDeadImage3 from './../../assets/redDeadImage3.png';
import redDeadImage4 from './../../assets/redDeadImage4.png';
import { useEffect, useRef } from 'react';

const gameImages = [redDeadImage1, redDeadImage2, redDeadImage3, redDeadImage4];



const SingleGameInfo = ({visibility, handleClose}: {visibility: boolean, handleClose: () => void}) => {
    const wrapperRef = useRef<any>();

    
    const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                document.removeEventListener("mousedown", handleClickOutside);
                handleClose();
            }
    }

    useEffect(() => {
        if (visibility === true) {
            document.addEventListener("mousedown", handleClickOutside)
        }
    }, [visibility])
    


    return (
        <div className={`SingleGameInfo ${visibility ? '' : 'notVisible'}`}>
            <div ref={wrapperRef} className='gameInfoContainer'>
                <div className='firstRow'>
                    <img className='gameCover' src={redDeadCover} alt='game cover'/>
                    <div className='generalInfo'>
                        <div className='info-row'>
                            <Typography className="title">Red Dead Redemption 2 (deluxe edition)</Typography>
                            <Typography className="descLabel">Description</Typography>
                            <Typography className="description">Set in a fictional recreation of the American Old West in 1899, Red Dead
                                        Redemption 2 focuses on the life of Arthur Morgan and his position 
                                        in the notorious Van der Linde gang. The game follows the gang's decline
                                        as they are pursued by lawmen, fellow gangs and Pinkerton agents.
                            </Typography>
                        </div>
                        <div className='act-row'>
                            <div className='decor'></div>
                            <Typography className='price'></Typography>
                            <Typography className='addToBasket'>Add to library</Typography>
                        </div>
                    </div>
                </div>
                <div className='gameImages'>
                    {
                        gameImages.map((image, i) => 
                            <img className="gameIllustration" src={image} key={i} alt='illustration'/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleGameInfo;