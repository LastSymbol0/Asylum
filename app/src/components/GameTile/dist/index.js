"use strict";
exports.__esModule = true;
require("./style.scss");
var material_1 = require("@mui/material");
var GameTile = function (_a) {
    var image = _a.image;
    return (React.createElement("div", { className: 'gameItemWrapper' },
        React.createElement("div", { className: "game", style: { background: "url(" + image + ")" } },
            React.createElement("div", { className: "addButtton" },
                React.createElement(material_1.Typography, { variant: "caption" }, "Add")))));
};
exports["default"] = GameTile;
