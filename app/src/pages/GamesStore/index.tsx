import './style.scss'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchBar from '../../components/SearchBar';

import GameTile from '../../components/GameTile';
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


const GamesCatalog = ({ gamesInCatalogIds, gamesInLibraryIds, isDisabled, gamesData }:
    {
        gamesInCatalogIds: StringPublicKey[],
        gamesInLibraryIds:  StringPublicKey[],
        isDisabled: boolean,
        gamesData: Record<string, GameState>
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
        <div className="gamesList">
            {gamesInCatalogIds.map((item, i) => {
                const data = gamesData[item] ?? {status: 'inProgress'}
                const loaded = data.status === 'loaded'

                const onAdd = () => { onGameAdd(item) }
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
                    onLaunch={onLaunch} />
            })}
        </div>)
}

const GamesStorePage = () => {
    const gamesInCatalogIds = useSelector((state: RootState) => state.gamesStorePage.gamesInCatalog)
    const gamesInLibraryIds = useSelector((state: RootState) => state.libraryPage.gamesInLibrary)
    const isCatalogFetched = useSelector((state: RootState) => state.gamesStorePage.isCatalogFetched)
    const isLibraryFetched = useSelector((state: RootState) => state.libraryPage.isLibraryFetched)
    const gameFriendsPlayId = useSelector((state: RootState) => state.gamesStorePage.friendsPlay)
    const gameSuggestedId = useSelector((state: RootState) => state.gamesStorePage.suggestedForYou)
    const gamesBannerIds = useSelector((state: RootState) => state.gamesStorePage.bannerGames)

    const gamesData = useSelector((state: RootState) => selectNftGames(state, [
        ...gamesInCatalogIds,
        gameFriendsPlayId,
        gameSuggestedId,
        ...gamesBannerIds
    ]))

    const dispatch = useDispatch();
    const wallet = useWallet()
    const playersProgram = usePlayersProgram();
    const asylumProgram = useAsylumProgram("https://api.devnet.solana.com", true);

    useEffect(() => {
        if (asylumProgram && !isCatalogFetched)
            dispatch(fetchGamesCatalogAndLoadNfts(asylumProgram))
    }, [asylumProgram, dispatch, gamesInCatalogIds, isCatalogFetched])

    useEffect(() => {
        if (playersProgram && !isLibraryFetched && wallet && wallet.connected)
            dispatch(fetchGamesLibraryAndLoadNfts({player: wallet.publicKey as PublicKey, program: playersProgram}))
    }, [playersProgram, dispatch, gamesInLibraryIds, isLibraryFetched, wallet])


    return <>

        <div className="GamesStoreWrapper">
            <div className="decor-1"></div>
            <div className="decor-2"></div>
            <div className="bannerWrapper">
                <div className="bannerLeftSideWrapper">

                    <Carousel className="Carousel" showStatus={false} showIndicators={false} showThumbs={false} autoPlay>
                        {gamesBannerIds.map(x => {
                            const data = gamesData[x] ?? {cover: ''};
                            return <div className="slide" style={{ background: `url(${data.game?.cover})` }}></div>
                        })}
                    </Carousel>

                    <SearchBar />


                </div>
                <div className="suggestedContainer">
                    <div className="suggested-firs--container">
                        <div className="decor-bottom">
                            <div className="suggested-first" style={{ background: `url(${gamesData[gameFriendsPlayId]?.game?.cover})` }}>
                                <div className="label">Friends play</div>
                                <div className={`price ${wallet.connected ? "active" : "disabled"}`}>Add</div>
                            </div>
                        </div>
                    </div>

                    <div className="suggested-second--container">
                        <div className="suggested-second" style={{ background: `url(${gamesData[gameSuggestedId]?.game?.cover})` }}>
                            <div className="label">Suggested for you</div>
                            <div className={`price ${wallet.connected ? "active" : "disabled"}`}>Add</div>
                        </div>
                    </div>

                </div>
            </div>

            <GamesCatalog gamesInCatalogIds={gamesInCatalogIds} gamesInLibraryIds={gamesInLibraryIds} isDisabled={!wallet.connected} gamesData={gamesData} />

        <div style={{ textAlign: 'center', width: '100%', padding: '40px 0px' }}>
            <DevPanelButton />
        </div>
        <div style={{ height: '100px' }}>
        </div>
    </div>
    </>
}

export { GamesStorePage }