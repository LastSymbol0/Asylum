"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Tabs_1 = require("@material-ui/core/Tabs");
var Tab_1 = require("@material-ui/core/Tab");
var react_router_dom_1 = require("react-router-dom");
var core_1 = require("@material-ui/core");
var telegramIcon_svg_1 = require("./../../assets/telegramIcon.svg");
var discordIcon_svg_1 = require("./../../assets/discordIcon.svg");
var placeholder_png_1 = require("./../../assets/placeholder.png");
var editPencil_svg_1 = require("./../../assets/editPencil.svg");
require("./style.scss");
var NavigationPanel = function (_a) {
    var pages = _a.pages;
    var location = react_router_dom_1.useLocation();
    var currentTab = location.pathname;
    var achievements = [
        {
            label: "achievement #1"
        },
        {
            label: "achievement #2"
        },
        {
            label: "achievement #3"
        }
    ];
    return (react_1["default"].createElement("div", { className: "NavigationPanelWrapper" },
        react_1["default"].createElement(Tabs_1["default"], { orientation: "vertical", variant: 'fullWidth', value: currentTab, textColor: "primary", classes: {
                indicator: "myIndicator"
            } }, pages.map((function (x, i) {
            return react_1["default"].createElement(Tab_1["default"], { disableRipple: true, key: i, label: react_1["default"].createElement(core_1.Typography, { variant: "body1" }, x.name), value: x.path, to: x.path, component: react_router_dom_1.Link });
        }))),
        react_1["default"].createElement("div", { className: "bottomContainer" },
            react_1["default"].createElement("div", { className: "decor-1" }, " "),
            react_1["default"].createElement("div", { className: "profileContainer" },
                react_1["default"].createElement("div", { className: "accountInfo" },
                    react_1["default"].createElement("img", { className: "profileIcon", src: placeholder_png_1["default"], alt: "profile icon" }),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(core_1.Typography, { className: "userName" },
                            "User Name",
                            react_1["default"].createElement("img", { className: "editIcon", src: editPencil_svg_1["default"], alt: "edit" })),
                        react_1["default"].createElement(core_1.Typography, null, "actual level"))),
                react_1["default"].createElement("div", { className: "achievmentsContainer" },
                    react_1["default"].createElement("ul", null, achievements.map(function (ach, i) {
                        return (react_1["default"].createElement("li", { key: i },
                            react_1["default"].createElement(core_1.Typography, null, ach.label)));
                    })))),
            react_1["default"].createElement("div", { className: "contactUsContainer" },
                react_1["default"].createElement(core_1.Typography, { variant: "body1" }, "Contact us"),
                react_1["default"].createElement(react_router_dom_1.Link, { to: { pathname: "https://" }, target: "_blank" },
                    react_1["default"].createElement("img", { className: "icon", src: telegramIcon_svg_1["default"], alt: "telegram icon" })),
                react_1["default"].createElement(react_router_dom_1.Link, { to: { pathname: "https://" }, target: "_blank" },
                    react_1["default"].createElement("img", { className: "icon", src: discordIcon_svg_1["default"], alt: "discord icon" }))))));
};
exports["default"] = NavigationPanel;
