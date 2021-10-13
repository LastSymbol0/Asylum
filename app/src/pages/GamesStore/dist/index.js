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
                                React.createElement("div", { className: "price" }, "15 \u20AC")))),
                    React.createElement("div", { className: "suggested-second--container" },
                        React.createElement("div", { className: "suggested-second", style: { background: "url(" + gamePlaceholder2_png_1["default"] + ")" } },
                            React.createElement("div", { className: "label" }, "Suggest for you"),
                            React.createElement("div", { className: "price" }, "10 \u20AC"))))),
            React.createElement("div", { className: "gamesList" },
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null),
                React.createElement(GameTile_1["default"], null))));
};
exports.GamesStorePage = GamesStorePage;
