import GameTile from '../../components/GameTile';
import './style.scss'

import { Typography } from '@material-ui/core';
import { useWallet } from '@solana/wallet-adapter-react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePlayersProgram } from '../../app/hooks';
import { RootState } from '../../app/store';
import { GameState, selectNftGames } from '../../nft-store/games/gamesNftStore';
import { fetchGamesLibraryAndLoadNfts } from './store/thunks';
import { PublicKey } from '@solana/web3.js'
import { StringPublicKey } from '@oyster/common';

const GamesLibrary = ({ gamesInLibraryIds, gamesData }:
    {
        gamesInLibraryIds: StringPublicKey[],
        gamesData: Record<string, GameState>
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

                return <GameTile
                    disabled={false}
                    loading={data.status === 'inProgress'}
                    loadingFailed={data.status === 'failed'}
                    image={loaded ? data.game?.cover : undefined}
                    isAdded={true}
                    onAdd={onAdd}
                    onLaunch={onLaunch} />
            })}
        </div>)
}

const LibraryPage = () => {
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
            <GamesLibrary gamesInLibraryIds={gamesInLibraryIds} gamesData={gamesData} />
    </div>)
}

export { LibraryPage }