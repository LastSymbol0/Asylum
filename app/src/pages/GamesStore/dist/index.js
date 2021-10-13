"use strict";
exports.__esModule = true;
exports.GamesStorePage = void 0;
require("./style.scss");
var react_responsive_carousel_1 = require("react-responsive-carousel");
require("react-responsive-carousel/lib/styles/carousel.min.css");
var SearchBar_1 = require("../../components/SearchBar");
var gamePlaceholder1_png_1 = require("./../../assets/gamePlaceholder1.png");
var gamePlaceholder2_png_1 = require("./../../assets/gamePlaceholder2.png");
var sliderPlaceholder_png_1 = require("./../../assets/sliderPlaceholder.png");
var GameTile_1 = require("../../components/GameTile");
var gameExample_png_1 = require("./../../assets/gameExample.png");
var game21_png_1 = require("./../../assets/game21.png");
var game2_png_1 = require("./../../assets/game2.png");
var Rectangle24_png_1 = require("./../../assets/Rectangle24.png");
var Rectangle21_png_1 = require("./../../assets/Rectangle21.png");
var Rectangle22_png_1 = require("./../../assets/Rectangle22.png");
var Rectangle23_png_1 = require("./../../assets/Rectangle23.png");
var Rectangle2_png_1 = require("./../../assets/Rectangle2.png");
var Rectangle25_png_1 = require("./../../assets/Rectangle25.png");
var Rectangle26_png_1 = require("./../../assets/Rectangle26.png");
var gamePosters = [gameExample_png_1["default"], game21_png_1["default"], game2_png_1["default"], Rectangle24_png_1["default"], Rectangle21_png_1["default"], Rectangle22_png_1["default"], Rectangle23_png_1["default"], Rectangle2_png_1["default"], Rectangle25_png_1["default"], Rectangle26_png_1["default"],];
var GamesStorePage = function () {
    return React.createElement(React.Fragment, null,
        React.createElement("div", { className: "GamesStoreWrapper" },
            React.createElement("div", { className: "decor-1" }),
            React.createElement("div", { className: "decor-2" }),
            React.createElement("div", { className: "bannerWrapper" },
                React.createElement("div", { className: "bannerLeftSideWrapper" },
                    React.createElement(react_responsive_carousel_1.Carousel, { className: "Carousel", showStatus: false, showIndicators: false, showThumbs: false, autoPlay: true },
                        React.createElement("div", { className: "slide", style: { background: "url(" + sliderPlaceholder_png_1["default"] + ")" } }),
                        React.createElement("div", { className: "slide", style: { background: "url(" + sliderPlaceholder_png_1["default"] + ")" } }),
                        React.createElement("div", { className: "slide", style: { background: "url(" + sliderPlaceholder_png_1["default"] + ")" } })),
                    React.createElement(SearchBar_1["default"], null)),
                React.createElement("div", { className: "suggestedContainer" },
                    React.createElement("div", { className: "suggested-firs--container" },
                        React.createElement("div", { className: "decor-bottom" },
                            React.createElement("div", { className: "suggested-first", style: { background: "url(" + gamePlaceholder1_png_1["default"] + ")" } },
                                React.createElement("div", { className: "label" }, "Friends play"),
                                React.createElement("div", { className: "price" }, "Add")))),
                    React.createElement("div", { className: "suggested-second--container" },
                        React.createElement("div", { className: "suggested-second", style: { background: "url(" + gamePlaceholder2_png_1["default"] + ")" } },
                            React.createElement("div", { className: "label" }, "Suggested for you"),
                            React.createElement("div", { className: "price" }, "Add"))))),
            React.createElement("div", { className: "gamesList" },
                gamePosters.map(function (item, i) { return React.createElement(GameTile_1["default"], { image: item }); }),
                gamePosters.map(function (item, i) { return React.createElement(GameTile_1["default"], { image: item }); }),
                gamePosters.map(function (item, i) { return React.createElement(GameTile_1["default"], { image: item }); }))));
};
exports.GamesStorePage = GamesStorePage;
