"use strict";
exports.__esModule = true;
exports.InventoryPage = void 0;
var material_1 = require("@mui/material");
var GameItem_1 = require("../../components/GameItem");
require("./style.scss");
var Riot_Helmet_png_1 = require("./../../assets/Riot_Helmet.png");
var Riot_Chestpiece_png_1 = require("./../../assets/Riot_Chestpiece.png");
var g_1_png_1 = require("./../../assets/g 1.png");
var items = [
    {
        image: Riot_Helmet_png_1["default"],
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '200,50'
    },
    {
        image: Riot_Chestpiece_png_1["default"],
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '1500,725'
    },
    {
        image: g_1_png_1["default"],
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '7,0'
    },
    {
        image: Riot_Chestpiece_png_1["default"],
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '1500,725'
    },
    {
        image: Riot_Helmet_png_1["default"],
        itemName: 'Name of the item',
        gameName: 'Game name',
        price: '200,50'
    },
];
var InventoryPage = function () {
    return React.createElement("div", { className: 'inventoryWrapper' },
        React.createElement("div", { className: 'inventoryBlock' },
            items.map(function (item, i) {
                return React.createElement(GameItem_1["default"], { image: item.image, itemName: item.itemName, gameName: item.gameName, price: item.price });
            }),
            items.map(function (item, i) {
                return React.createElement(GameItem_1["default"], { image: item.image, itemName: item.itemName, gameName: item.gameName, price: item.price });
            })),
        React.createElement("div", { className: 'gameCategoryDivider' },
            React.createElement(material_1.Typography, { className: 'deviderText' }, "Items from game \u201CYour favorite shooter\u201D")),
        React.createElement("div", { className: 'inventoryBlock' },
            items.map(function (item, i) {
                return React.createElement(GameItem_1["default"], { image: item.image, itemName: item.itemName, gameName: item.gameName, price: item.price });
            }),
            items.map(function (item, i) {
                return React.createElement(GameItem_1["default"], { image: item.image, itemName: item.itemName, gameName: item.gameName, price: item.price });
            })));
};
exports.InventoryPage = InventoryPage;
