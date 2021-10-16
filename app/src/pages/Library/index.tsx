import GameTile from '../../components/GameTile';
import './style.scss'

import { Typography } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePlayersProgram } from '../../app/hooks';
import { RootState } from '../../app/store';
import { GameState, selectNftGames } from '../../nft-store/games/gamesNftStore';
import { fetchGamesLibraryAndLoadNfts } from './store/thunks';
import { PublicKey } from '@solana/web3.js'
import { StringPublicKey } from '@oyster/common';
import SingleGameInfo from '../../components/SingleGameInfo';

const GamesLibrary = ({ gamesInLibraryIds, gamesData, setSelected }:
    {
        gamesInLibraryIds: StringPublicKey[],
        gamesData: Record<string, GameState>
        setSelected: (x: StringPublicKey) => void
    }) => {
    return (
        <div className="gamesList">
            {gamesInLibraryIds.map((item, i) => {
                const data = gamesData[item] ?? {status: 'inProgress'}
                const loaded = data.status === 'loaded'

                const onAdd = () => { }
                const onLaunch = () => {
                    if (loaded)
                        window?.open(data.game?.launchUrl, '_blank')?.focus()
                }
                const onClick = () => { setSelected(item) }

                return <GameTile
                    disabled={false}
                    loading={data.status === 'inProgress'}
                    loadingFailed={data.status === 'failed'}
                    image={loaded ? data.game?.cover : undefined}
                    isAdded={true}
                    onAdd={onAdd}
                    onLaunch={onLaunch}
                    onClick={onClick} />
            })}
        </div>)
}

const LibraryPage = () => {
    const [selected, setSelected] = useState('')
    const gamesInLibraryIds = useSelector((state: RootState) => state.libraryPage.gamesInLibrary)
    const isLibraryFetched = useSelector((state: RootState) => state.libraryPage.isLibraryFetched)

    const gamesData = useSelector((state: RootState) => selectNftGames(state, gamesInLibraryIds))

    const dispatch = useDispatch();
    const wallet = useWallet()
    const playersProgram = usePlayersProgram();

    useEffect(() => {
        if (playersProgram && !isLibraryFetched && wallet && wallet.connected)
            dispatch(fetchGamesLibraryAndLoadNfts({player: wallet.publicKey as PublicKey, program: playersProgram}))
    }, [playersProgram, dispatch, gamesInLibraryIds, isLibraryFetched, wallet])


    return (
    <div className="libraryWrapper">

        <div className='libraryHeader'>
            <Typography className='libraryHeaderText'>My games</Typography>
        </div>
            <GamesLibrary gamesInLibraryIds={gamesInLibraryIds} gamesData={gamesData} setSelected={setSelected} />

            <SingleGameInfo
                        visibility={selected !== ''}
                        game={gamesData[selected]?.game}
                        handleClose={ () => { setSelected('') }}
                        isAdded={gamesInLibraryIds.indexOf(selected) !== -1}/>
    </div>)
}

export { LibraryPage }