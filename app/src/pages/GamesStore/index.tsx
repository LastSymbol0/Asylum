import './style.scss'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import SearchBar from '../../components/SearchBar';

import gamePlaceholder1 from './../../assets/gamePlaceholder1.png';
import gamePlaceholder2 from './../../assets/gamePlaceholder2.png';
import gamePlaceholder3 from './../../assets/sliderPlaceholder.png';
import GameTile from '../../components/GameTile';
import SingleGameInfo from '../../components/SingleGameInfo';

import gameExample from "./../../assets/gameExample.png";
import gameExample1 from "./../../assets/game21.png";
import gameExample2 from "./../../assets/game2.png";
import gameExample3 from "./../../assets/Rectangle24.png";
import gameExample4 from "./../../assets/Rectangle21.png";
import gameExample5 from "./../../assets/Rectangle22.png";
import gameExample6 from "./../../assets/Rectangle23.png";
import gameExample7 from "./../../assets/Rectangle2.png";
import gameExample8 from "./../../assets/Rectangle25.png";
import gameExample9 from "./../../assets/Rectangle26.png";
import { useState } from 'react';

const gamePosters = [gameExample, gameExample1, gameExample2, gameExample3, gameExample4, gameExample5, gameExample6, gameExample7, gameExample8, gameExample9,]



const GamesStorePage = () => {
    const [visibility, setVisibility] = useState(true);

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
                                    <div className="price">Add</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="suggested-second--container">
                            <div className="suggested-second" style={{background: `url(${gamePlaceholder2})`}}>
                                <div className="label">Suggested for you</div>
                                <div className="price">Add</div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="gamesList">

                    <SingleGameInfo visibility={visibility} handleClose={ () => { setVisibility(false) }}/>

                    {
                        gamePosters.map((item, i) => <GameTile image={item} />)
                    }
                    {
                        gamePosters.map((item, i) => <GameTile image={item} />)
                    }
                    {
                        gamePosters.map((item, i) => <GameTile image={item} />)
                    }
                    
                </div>
            </div>
         
    </>
}

export { GamesStorePage }