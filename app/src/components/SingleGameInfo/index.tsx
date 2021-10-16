import './style.scss';
import { Typography } from '@mui/material';

import redDeadCover from './../../assets/redDeadCover.png';
import redDeadImage1 from './../../assets/redDeadImage1.png';
import redDeadImage2 from './../../assets/redDeadImage2.png';
import redDeadImage3 from './../../assets/redDeadImage3.png';
import redDeadImage4 from './../../assets/redDeadImage4.png';
import { useEffect, useRef } from 'react';
import { GameNftData } from '../../nft-store/games/gamesNftStore';
import { usePlayersProgram } from '../../app/hooks';
import { StringPublicKey } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { useDispatch } from 'react-redux';
import { players } from '../../lib';
import { fetchGamesLibrary } from '../../pages/Library/store/thunks';
import { PublicKey } from '@solana/web3.js'

const gameImages = [redDeadImage1, redDeadImage2, redDeadImage3, redDeadImage4];



const SingleGameInfo = ({visibility, game, handleClose, isAdded}: {visibility: boolean, game: GameNftData | undefined, handleClose: () => void, isAdded: boolean}) => {
    const wrapperRef = useRef<any>();

    const playersProgram = usePlayersProgram();
    const dispatch = useDispatch();
    const wallet = useWallet()


    const onAdd = () => {
        if (playersProgram && game)
            players.addGameToLibrary(playersProgram, game.address)
            .then(() => dispatch(fetchGamesLibrary({player: wallet.publicKey as PublicKey, program: playersProgram})))
    }

    const onLaunch = () => {
        if (game)
            window?.open(game.launchUrl, '_blank')?.focus()
    }
    
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
                    <img className='gameCover' src={game?.cover} alt='game cover'/>
                    <div className='generalInfo'>
                        <div className='info-row'>
                            <Typography className="title">{ game?.title}</Typography>
                            <Typography className="descLabel">Description</Typography>
                            <Typography className="description">{ game?.description}</Typography>
                        </div>
                        <div className='act-row'>
                            <div className='decor'></div>
                            <Typography className='price'></Typography>
                            <div onClick={isAdded ? onLaunch : onAdd}>
                                <Typography className='addToBasket'>{isAdded ? "Launch" : "Add to library"}</Typography>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='gameImages'>
                    {
                        game?.images.map((image, i) => 
                            <img className="gameIllustration" src={image} key={i} alt='illustration'/>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default SingleGameInfo;