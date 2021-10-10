"use strict";
exports.__esModule = true;
require("./App.scss");
var wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
var wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
var wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
var react_router_dom_1 = require("react-router-dom");
var material_1 = require("@mui/material");
var NavigationPanel_1 = require("./components/NavigationPanel");
var Header_1 = require("./components/Header");
var routes_1 = require("./routes");
var CssBaseline_1 = require("@material-ui/core/CssBaseline");
var core_1 = require("@material-ui/core");
var wallets = [wallet_adapter_wallets_1.getPhantomWallet()];
var Pages = function (_a) {
    var pages = _a.pages;
    return (React.createElement(react_router_dom_1.Switch, null, pages.map((function (x) { return React.createElement(react_router_dom_1.Route, { path: x.path, key: x.path, exact: true, component: x.component }); }))));
};
var theme = core_1.createTheme({
    palette: {
        primary: {
            main: "#ffffff",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#ffffff",
            contrastText: "#ffffff"
        },
        background: {
            "default": '#161616'
        },
        text: {
            primary: 'rgba(255, 255, 255, 1)',
            secondary: 'rgba(255, 255, 255, 1)',
            disabled: 'rgba(255, 255, 255, 0.33)'
        }
    },
    typography: {
        body1: {
            fontSize: 16
        }
    }
});
function App() {
    return (React.createElement(core_1.ThemeProvider, { theme: theme },
        React.createElement(CssBaseline_1["default"], null),
        React.createElement("div", { className: "App" },
            React.createElement(react_router_dom_1.HashRouter, { basename: "/" + process.env.PUBLIC_URL },
                React.createElement(material_1.Grid, { container: true, spacing: 2, columns: 5 },
                    React.createElement(material_1.Grid, { item: true, xs: 1 },
                        React.createElement(Header_1["default"], null),
                        React.createElement(NavigationPanel_1["default"], { pages: routes_1.routes })),
                    React.createElement(material_1.Grid, { style: { paddingTop: '110px' }, item: true, xs: 4 },
                        React.createElement(Pages, { pages: routes_1.routes })))))));
}
var AppWithProvider = function () { return (React.createElement(wallet_adapter_react_1.ConnectionProvider, { endpoint: "http://127.0.0.1:8899" },
    React.createElement(wallet_adapter_react_1.WalletProvider, { wallets: wallets, autoConnect: true },
        React.createElement(wallet_adapter_react_ui_1.WalletModalProvider, null,
            React.createElement(App, null))))); };
exports["default"] = AppWithProvider;
