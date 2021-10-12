"use strict";
exports.__esModule = true;
exports.routes = void 0;
var GamesStore_1 = require("./pages/GamesStore");
var Inventory_1 = require("./pages/Inventory");
var Library_1 = require("./pages/Library");
var Marketplace_1 = require("./pages/Marketplace");
var Demo1_players_1 = require("./demos/Demo1_players");
var Demo2_achievements_1 = require("./demos/Demo2_achievements");
var Dev_Panel_Page_1 = require("./demos/Dev_Panel_Page");
exports.routes = [
    // Tmp
    {
        path: "/gamesStore",
        name: "Games Store",
        component: GamesStore_1.GamesStorePage
    },
    {
        path: "/inventory",
        name: "Inventory",
        component: Inventory_1.InventoryPage
    },
    {
        path: "/library",
        name: "Library",
        component: Library_1.LibraryPage
    },
    {
        path: "/marketplace",
        name: "Marketplace",
        component: Marketplace_1.MarketplacePage
    },
    {
        path: "/demo1",
        name: "[DEV] Demo 1 (Players)",
        component: Demo1_players_1["default"]
    },
    {
        path: "/demo2",
        name: "[DEV] Demo 2 (Achievements; admin)",
        component: Demo2_achievements_1["default"]
    },
    {
        path: "/dev-panel",
        name: "[Dev] DevPanel",
        component: Dev_Panel_Page_1["default"]
    },
];
