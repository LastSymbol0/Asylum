"use strict";
exports.__esModule = true;
require("./style.scss");
var material_1 = require("@mui/material");
var redDeadCover_png_1 = require("./../../assets/redDeadCover.png");
var redDeadImage1_png_1 = require("./../../assets/redDeadImage1.png");
var redDeadImage2_png_1 = require("./../../assets/redDeadImage2.png");
var redDeadImage3_png_1 = require("./../../assets/redDeadImage3.png");
var redDeadImage4_png_1 = require("./../../assets/redDeadImage4.png");
var react_1 = require("react");
var gameImages = [redDeadImage1_png_1["default"], redDeadImage2_png_1["default"], redDeadImage3_png_1["default"], redDeadImage4_png_1["default"]];
var SingleGameInfo = function (_a) {
    var visibility = _a.visibility, handleClose = _a.handleClose;
    var wrapperRef = react_1.useRef();
    var handleClickOutside = function (event) {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
            document.removeEventListener("mousedown", handleClickOutside);
            handleClose();
        }
    };
    react_1.useEffect(function () {
        if (visibility === true) {
            document.addEventListener("mousedown", handleClickOutside);
        }
    }, [visibility]);
    return (React.createElement("div", { className: "SingleGameInfo " + (visibility ? '' : 'notVisible') },
        React.createElement("div", { ref: wrapperRef, className: 'gameInfoContainer' },
            React.createElement("div", { className: 'firstRow' },
                React.createElement("img", { className: 'gameCover', src: redDeadCover_png_1["default"], alt: 'game cover' }),
                React.createElement("div", { className: 'generalInfo' },
                    React.createElement("div", { className: 'info-row' },
                        React.createElement(material_1.Typography, { className: "title" }, "Red Dead Redemption 2 (deluxe edition)"),
                        React.createElement(material_1.Typography, { className: "descLabel" }, "Description"),
                        React.createElement(material_1.Typography, { className: "description" }, "Set in a fictional recreation of the American Old West in 1899, Red Dead Redemption 2 focuses on the life of Arthur Morgan and his position in the notorious Van der Linde gang. The game follows the gang's decline as they are pursued by lawmen, fellow gangs and Pinkerton agents.")),
                    React.createElement("div", { className: 'act-row' },
                        React.createElement("div", { className: 'decor' }),
                        React.createElement(material_1.Typography, { className: 'price' }),
                        React.createElement(material_1.Typography, { className: 'addToBasket' }, "Add to library")))),
            React.createElement("div", { className: 'gameImages' }, gameImages.map(function (image, i) {
                return React.createElement("img", { className: "gameIllustration", src: image, key: i, alt: 'illustration' });
            })))));
};
exports["default"] = SingleGameInfo;
