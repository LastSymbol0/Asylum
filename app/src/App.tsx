import './App.css';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";
import { Grid } from '@mui/material'
import { NavigationPanel } from './components/NavigationPanel';
import { Route as PageRoute, routes } from './routes'

const wallets = [getPhantomWallet()]

const Pages = ({ pages }: { pages: PageRoute[] }) => {
  
  return (
    <Switch>
      {pages.map((x => <Route path={x.path} key={x.path} exact component={x.component} />))}
    </Switch>)
}

function App() {
  return (
    <div className="App">
      <HashRouter basename={`/${process.env.PUBLIC_URL}`}>

        <Grid container spacing={2} columns={5}>
          <Grid item xs={1}>
            <NavigationPanel pages={routes} />
          </Grid>
          <Grid item xs={4}>
            <Pages pages={routes} />
          </Grid>
        </Grid>

      </HashRouter>
    </div>
  );
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="http://127.0.0.1:8899">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
        {/* <PlayersDemo/> */}
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)


export default AppWithProvider;
