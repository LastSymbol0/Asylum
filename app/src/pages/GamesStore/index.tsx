import './style.scss'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchBar from '../../components/SearchBar';

import gamePlaceholder1 from './../../assets/gamePlaceholder1.png';
import gamePlaceholder2 from './../../assets/gamePlaceholder2.png';
import gamePlaceholder3 from './../../assets/sliderPlaceholder.png';
import GameTile from '../../components/GameTile';



const GamesStorePage = () => {

    return <>
        
            <div className="GamesStoreWrapper">
            <div className="decor-1"></div>
            <div className="decor-2"></div>  
                <div className="bannerWrapper">
                    <div className="bannerLeftSideWrapper">

                    <Carousel className="Carousel" showStatus={false} showIndicators={false} showThumbs={false} autoPlay>
                        <div className="slide" style={{background: `url(${gamePlaceholder3})`}}></div>
                        <div className="slide" style={{background: `url(${gamePlaceholder3})`}}></div>
                        <div className="slide" style={{background: `url(${gamePlaceholder3})`}}></div>
                    </Carousel>

                    <SearchBar />


                    </div>
                    <div className="suggestedContainer">
                        <div className="suggested-firs--container">
                            <div className="decor-bottom">
                                <div className="suggested-first" style={{background: `url(${gamePlaceholder1})`}}>
                                    <div className="label">Friends play</div>
                                    <div className="price">15 €</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="suggested-second--container">
                            <div className="suggested-second" style={{background: `url(${gamePlaceholder2})`}}>
                                <div className="label">Suggest for you</div>
                                <div className="price">10 €</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="gamesList">
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                    <GameTile />
                </div>
            </div>
         
    </>
}

export { GamesStorePage }