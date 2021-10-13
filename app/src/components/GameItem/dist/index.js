"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var sol_svg_1 = require("./../../assets/sol.svg");
require("./style.scss");
var GameItem = function (_a) {
    var image = _a.image, itemName = _a.itemName, gameName = _a.gameName, price = _a.price;
    return (React.createElement("div", { className: 'gameItemBox' },
        React.createElement("div", { className: 'gameItem' },
            React.createElement("img", { className: 'itemImage', alt: 'item', src: image }),
            React.createElement("div", { className: "SellButton" },
                React.createElement(material_1.Typography, { variant: "caption" }, "Sell")),
            React.createElement("div", { className: 'hoverBox' },
                React.createElement(material_1.Typography, null, "View on blockchain"))),
        React.createElement(material_1.Typography, { className: "itemName" }, itemName),
        React.createElement("div", { className: 'dataBox' },
            React.createElement(material_1.Typography, { className: 'name' }, gameName),
            React.createElement(material_1.Typography, { className: "price" },
                price,
                React.createElement("img", { className: 'solSymbol', src: sol_svg_1["default"], alt: 'sol' })))));
};
exports["default"] = GameItem;
