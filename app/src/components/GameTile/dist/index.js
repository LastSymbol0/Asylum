"use strict";
exports.__esModule = true;
require("./style.scss");
var gameExample_png_1 = require("./../../assets/gameExample.png");
var material_1 = require("@mui/material");
var GameTile = function () {
    return (React.createElement("div", { className: "game", style: { background: "url(" + gameExample_png_1["default"] + ")" } },
        React.createElement("div", { className: "addButtton" },
            React.createElement(material_1.Typography, { variant: "caption" }, "Add"))));
};
exports["default"] = GameTile;
