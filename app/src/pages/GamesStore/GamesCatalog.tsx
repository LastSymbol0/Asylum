import './style.scss'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchBar from '../../components/SearchBar';

import GameTile from '../../components/GameTile';
import SingleGameInfo from '../../components/SingleGameInfo';

import { useState } from 'react';

import DevPanelButton from '../../components/DevPanelForm';




import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useDispatch, useSelector } from 'react-redux';
import { GameState, selectNftGames } from '../../nft-store/games/gamesNftStore';
import { RootState } from '../../app/store';
import { useEffect } from 'react';
import { fetchGamesCatalog, fetchGamesCatalogAndLoadNfts } from './store/thunks';
import { useAsylumProgram, usePlayersProgram } from '../../app/hooks';
import { asylum, players } from '../../lib';
import { fetchGamesLibrary, fetchGamesLibraryAndLoadNfts } from '../Library/store/thunks';
import { StringPublicKey } from '@oyster/common';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';



const GamesCatalog = ({ gamesInCatalogIds, gamesInLibraryIds, isDisabled, gamesData, setSelected}:
    {
        gamesInCatalogIds: StringPublicKey[],
        gamesInLibraryIds:  StringPublicKey[],
        isDisabled: boolean,
        gamesData: Record<string, GameState>,
        setSelected: (x: string) => void
    }) => {
    const playersProgram = usePlayersProgram();
    const dispatch = useDispatch();
    const wallet = useWallet()


    const onGameAdd = (game: StringPublicKey) => {
        if (playersProgram)
            players.addGameToLibrary(playersProgram, new PublicKey(game))
            .then(() => dispatch(fetchGamesLibrary({player: wallet.publicKey as PublicKey, program: playersProgram})))
    }

    isDisabled = isDisabled && !!!playersProgram

    // var searchQuery = "";

    return (
        <div>
            <FormGroup style={{marginLeft: '50px'}}>
            <FormControlLabel control={<Checkbox sx={{
    color: '#ffffff',
    '&.Mui-checked': {
      color:  '#ffffff',
    },
  }} defaultChecked />} label="Show unverified" />
            </FormGroup>
            <div className="gamesList">
                {gamesInCatalogIds.map((item, i) => {
                    const data = gamesData[item] ?? {status: 'inProgress'}
                    const loaded = data.status === 'loaded'

                    const onAdd = () => { onGameAdd(item) }
                    const onClick = () => { setSelected(item) }
                    const onLaunch = () => {
                        if (loaded)
                            window?.open(data.game?.launchUrl, '_blank')?.focus()
                    }


                    // if (!data.game?.title.includes(searchQuery))
                        // return <></>

                    return <GameTile
                        disabled={isDisabled}
                        loading={data.status === 'inProgress'}
                        loadingFailed={data.status === 'failed'}
                        image={loaded ? data.game?.cover : undefined}
                        isAdded={gamesInLibraryIds.indexOf(item) !== -1}
                        onAdd={onAdd}
                        onLaunch={onLaunch}
                        onClick={onClick}
                        key={i.toString()}/>
                })}
            </div>
            </div>)
        
}


export default GamesCatalog;