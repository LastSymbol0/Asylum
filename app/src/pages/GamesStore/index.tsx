import './style.scss'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchBar from '../../components/SearchBar';

import GameTile from '../../components/GameTile';
import DevPanelButton from '../../components/DevPanelForm';


import { useWallet } from '@solana/wallet-adapter-react'
import { PublicKey } from '@solana/web3.js'
import { useSelector } from 'react-redux';
import { GameState, selectNftGames } from '../../nft-store/games/gamesNftStore';
import { RootState } from '../../app/store';
import { bannerGames, friendsPlayGame, suggestedForYouGame } from '../../nft-store/games/dummyGames';


const GamesCatalog = ({ gamesInCatalogIds, isDisabled, gamesData }:
    {
        gamesInCatalogIds: PublicKey[],
        isDisabled: boolean,
        gamesData: Record<string, GameState>
    }) => {
    // var searchQuery = "";

    return (
        <div className="gamesList">
            {gamesInCatalogIds.map((item, i) => {
                const data = gamesData[item.toString()]
                const loaded = data.status === 'loaded'

                const onAdd = () => { }
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
                    onAdd={onAdd}
                    onLaunch={onLaunch} />
            })}
        </div>)
}

const GamesStorePage = () => {
    const gamesInCatalogIds = useSelector((state: RootState) => state.gamesStorePage.gamesInCatalog)
    const gameFriendsPlayId = useSelector((state: RootState) => state.gamesStorePage.friendsPlay)
    const gameSuggestedId = useSelector((state: RootState) => state.gamesStorePage.suggestedForYou)
    const gamesBannerIds = useSelector((state: RootState) => state.gamesStorePage.bannerGames)

    const gamesData = useSelector((state: RootState) => selectNftGames(state, [
        ...gamesInCatalogIds,
        gameFriendsPlayId,
        gameSuggestedId,
        ...gamesBannerIds
    ]))


    // const [isAdded, setIsAdded] = useState(false)
    const wallet = useWallet()

    // async function getProvider() {
    //     if (!anchorWallet)
    //         return

    //     const network = "http://127.0.0.1:8899";
    //     const connection = new Connection(network, "processed")

    //     const provider = new Provider(
    //         connection, anchorWallet, { preflightCommitment: "processed" },
    //     )
    //     return provider;
    // }

    // async function addGame(game: PublicKey) {
    //     const provider = await getProvider()
    //     const program = new Program(playersIdl as Idl, playersIdl.metadata.address, provider)

    //     players.addGameToLibrary(program, game)
    //         .catch(err => console.log("Transaction error: ", err))
    //         .finally(() => setIsAdded(true))
    // }


    // const anywayLoseTile = <GameTile
    //     image={anywayLoseCover}
    //     isAdded={isAdded}
    //     disabled={!wallet.connected}
    //     onLaunch={() => window?.open("http://localhost:8000/Asylum_AnywayLose", '_blank')?.focus()}
    //     onAdd={() => addGame(Keypair.generate().publicKey)} />

    // const tilesWithRealGame = gamesInCatalogIds.map((item, i) => i === 0
    //     ? anywayLoseTile
    //     : <GameTile disabled={!wallet.connected} image={gamesData[item.toString()].status === 'loaded' ? item.} />)

    return <>

        <div className="GamesStoreWrapper">
            <div className="decor-1"></div>
            <div className="decor-2"></div>
            <div className="bannerWrapper">
                <div className="bannerLeftSideWrapper">

                    <Carousel className="Carousel" showStatus={false} showIndicators={false} showThumbs={false} autoPlay>
                        {bannerGames.map(x => {
                            const data = gamesData[x.publicKey.toString()];
                            return <div className="slide" style={{ background: `url(${data.game?.cover})` }}></div>
                        })}
                    </Carousel>

                    <SearchBar />


                </div>
                <div className="suggestedContainer">
                    <div className="suggested-firs--container">
                        <div className="decor-bottom">
                            <div className="suggested-first" style={{ background: `url(${gamesData[friendsPlayGame.publicKey.toString()].game?.cover})` }}>
                                <div className="label">Friends play</div>
                                <div className={`price ${wallet.connected ? "active" : "disabled"}`}>Add</div>
                            </div>
                        </div>
                    </div>

                    <div className="suggested-second--container">
                        <div className="suggested-second" style={{ background: `url(${gamesData[suggestedForYouGame.publicKey.toString()].game?.cover})` }}>
                            <div className="label">Suggested for you</div>
                            <div className={`price ${wallet.connected ? "active" : "disabled"}`}>Add</div>
                        </div>
                    </div>

                </div>
            </div>

            <GamesCatalog gamesInCatalogIds={gamesInCatalogIds} isDisabled={!wallet.connected} gamesData={gamesData} />

        <div style={{ textAlign: 'center', width: '100%', padding: '40px 0px' }}>
            <DevPanelButton />
        </div>
        <div style={{ height: '100px' }}>
        </div>
    </div>
         
    </>
}

export { GamesStorePage }