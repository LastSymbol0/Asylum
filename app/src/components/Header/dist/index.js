"use strict";
exports.__esModule = true;
var react_1 = require("react");
var logo_svg_1 = require("./../../assets/logo.svg");
var settingsIcon_svg_1 = require("./../../assets/settingsIcon.svg");
require("./style.scss");
var FormControl_1 = require("@mui/material/FormControl");
var Select_1 = require("@mui/material/Select");
var MenuItem_1 = require("@mui/material/MenuItem");
var material_1 = require("@mui/material");
var react_router_dom_1 = require("react-router-dom");
var routes_1 = require("../../routes");
var Icon = function () {
    return (react_1["default"].createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "15", height: "8", viewBox: "0 0 8 8", fill: "none" },
        react_1["default"].createElement("path", { d: "M0.20001 5.86285L0.25001 7.21143L2.10001 5.38285C3.12001 4.36571 3.98001 3.54285 4.02001 3.54285C4.06001 3.54285 4.91001 4.36571 5.92001 5.37143C6.93001 6.37714 7.77001 7.2 7.80001 7.2C7.83001 7.2 7.83001 6.56 7.80001 5.77143L7.75001 4.34285L5.90001 2.51428C4.89001 1.50857 4.03001 0.685711 4.00001 0.685711C3.94001 0.685711 0.41001 4.16 0.25001 4.37714C0.19001 4.45714 0.17001 5.04 0.20001 5.86285Z", fill: "white" })));
};
var Header = function () {
    var _a = react_1["default"].useState('EN'), lang = _a[0], setLang = _a[1];
    var handleChange = function (event) {
        setLang(event.target.value);
    };
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", { className: "HeaderWrapper" },
            react_1["default"].createElement(react_router_dom_1.Link, { to: routes_1.homepath },
                react_1["default"].createElement("img", { src: logo_svg_1["default"], alt: 'logo' })),
            react_1["default"].createElement("div", { className: "HeaderRight" },
                react_1["default"].createElement(FormControl_1["default"], { fullWidth: true },
                    react_1["default"].createElement(Select_1["default"], { autoWidth: true, id: "demo-simple-select", displayEmpty: false, value: lang, onChange: handleChange, defaultValue: 'EN', variant: 'standard', IconComponent: Icon },
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'EN' },
                            react_1["default"].createElement(material_1.Typography, { variant: "body1" }, "EN")),
                        react_1["default"].createElement(MenuItem_1["default"], { value: 'RU' },
                            react_1["default"].createElement(material_1.Typography, { variant: "body1" }, "RU")))),
                react_1["default"].createElement("div", { className: "settingButtons" },
                    react_1["default"].createElement("img", { src: settingsIcon_svg_1["default"], alt: "settingsIcon" })),
                react_1["default"].createElement("button", { className: "connectWallerButton" }, "connect wallet")))));
};
exports["default"] = Header;
