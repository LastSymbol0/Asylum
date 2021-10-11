import './App.scss';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import {Grid} from '@mui/material'
import NavigationPanel  from './components/NavigationPanel';
import Header from './components/Header';
import { Route as PageRoute, routes } from './routes';
import CssBaseline from "@material-ui/core/CssBaseline";
import { createTheme, ThemeProvider, useTheme } from '@material-ui/core';

const wallets = [getPhantomWallet()]

const Pages = ({ pages }: { pages: PageRoute[] }) => {
  
  return (
    <Switch>
      {pages.map((x => <Route path={x.path} key={x.path} exact component={x.component} />))}
    </Switch>)
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#ffffff",
    },
    background: {
      default: '#161616'
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
      disabled: 'rgba(255, 255, 255, 0.33)'
    }
  },
  typography: {
    body1: {
      fontSize : 16,
    },
    caption: {
        color: '#000000',
        fontSize : 16,
    },
  }
});



function App() {

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="App">

          <HashRouter basename={`/${process.env.PUBLIC_URL}`}>
                

            <Grid container  columns={1}>
              <Grid item xs={1}><Header /></Grid>
            </Grid>
            <Grid container spacing={2} columns={5}>
              <Grid item xs={1}>
                <NavigationPanel pages={routes} />
              </Grid>
              <Grid item xs={4}>
                <div className="contentWrapper">
                  <Pages pages={routes} />
                </div>
              </Grid>
            </Grid>

          </HashRouter>
        </div>
       </ThemeProvider>
  );
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)


export default AppWithProvider;


