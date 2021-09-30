// @ts-nocheck

import React, { useState, Fragment } from "react";
import clsx from "clsx";
import { Router, Route, Link } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button,
  List,
  ListItem,
  Dialog,
  Slide,
  ListItemIcon,
  ListItemText,
  Paper,
  IconButton,
  Menu,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import ErrorIcon from "@material-ui/icons/Error";
import NatureIcon from "@material-ui/icons/Nature";
import GitHubIcon from "@material-ui/icons/GitHub";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import { AccountPage } from "../pages/Account";
// import { GamesStorePage } from "../pages/GamesStore";
import { InventoryPage } from "../pages/Inventory";
// import { LibraryPage } from "../pages/LibraryPage";
import { MarketplacePage } from "../pages/Marketplace";

const drawerWidth = 240;
const history = createBrowserHistory();

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1,
  },
  aboutp: {
    marginTop: 100,
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick, onClick, onClose, open }) => (
    <Fragment>
      <AppBar
        className={classes.aboveDrawer}
        // style={{ background: "rgb(26, 132, 97)" }}
      >
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.flex}>
            {title}
          </Typography>
          <IconButton
            href="https://github.com/LastSymbol0/Asylum"
            target="blank"
            color="inherit"
          >
            <GitHubIcon />
          </IconButton>
          <Button
            variant="outlined"
            style={{ background: "#fff" }}
            onClick={onClick}
          >
            About
          </Button>
          <Dialog
            fullScreen
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
          >
            <AppBar
              className={classes.appBar}
              style={{ background: "rgb(26, 132, 97)" }}
            >
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={onClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  About Us
                </Typography>
              </Toolbar>
            </AppBar>
            <Paper elevation={3}>
              <Typography
                className={classes.aboutp}
                gutterBottom
                align="center"
              >
                "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam 
                rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui 
                ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, 
                sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, 
                quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iu
                re reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas 
                nulla pariatur?"


                <IconButton
                  href="https://github.com/LastSymbol0/Asylum"
                  target="blank"
                  color="inherit"
                >
                  <GitHubIcon />
                </IconButton>
                <Button
                  href="https://dev.to/zeshama"
                  target="blank"
                  color="inherit"
                >
                  Dev.to
                </Button>
              </Typography>
            </Paper>
          </Dialog>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
      <Drawer
        variant={variant}
        open={open}
        onClose={onClose}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div
          className={clsx({
            [classes.toolbarMargin]: variant === "persistent",
          })}
        />
        <List>
          <ListItem
            button
            component={Link}
            to="/"
            onClick={onItemClick("Marketplace")}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Marketplace</ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/inventory"
            onClick={onItemClick("Inventory")}
          >
            <ListItemIcon>
              <ErrorIcon />
            </ListItemIcon>
            <ListItemText>Inventory </ListItemText>
          </ListItem>
          <ListItem
            button
            component={Link}
            to="/account"
            onClick={onItemClick("Account")}
          >
            <ListItemIcon>
              <NatureIcon />
            </ListItemIcon>
            <ListItemText>Account </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Route exact path="/" component={MarketplacePage} />
        <Route path="/inventory" component={InventoryPage} />
        <Route path="/account" component={AccountPage} />
      </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [open, setOpen] = React.useState(false);

  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState("Home");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = (title) => () => {
    setTitle(title);
    setDrawer(variant === "temporary" ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar
        title={title}
        onMenuClick={toggleDrawer}
        onClick={handleClickOpen}
        onClose={handleClose}
        open={open}
      />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)(AppBarInteraction);
