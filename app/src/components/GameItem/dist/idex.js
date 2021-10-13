"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var Riot_Helmet_png_1 = require("./../../assets/Riot_Helmet.png");
var sol_svg_1 = require("./../../assets/sol.svg");
require("./style.scss");
var GameItem = function () {
    return (React.createElement("div", { className: 'gameItemBox' },
        React.createElement("div", { className: 'gameItem' },
            React.createElement("img", { className: 'itemImage', alt: 'item', src: Riot_Helmet_png_1["default"] }),
            React.createElement("div", { className: "SellButton" },
                React.createElement(material_1.Typography, { variant: "caption" }, "Sell"))),
        React.createElement(material_1.Typography, { className: "itemName" }, "Name of the item"),
        React.createElement("div", { className: 'dataBox' },
            React.createElement(material_1.Typography, { className: 'name' }, "Game name"),
            React.createElement(material_1.Typography, { className: "price" },
                "200,50",
                React.createElement("img", { className: 'solSymbol', src: sol_svg_1["default"], alt: 'sol' })))));
};
exports["default"] = GameItem;
