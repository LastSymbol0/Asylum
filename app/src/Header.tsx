import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Toolbar, AppBar, Box, Typography } from "@material-ui/core";
import { Link, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 50,
    height: 43.54,
  },
});

const Header = () => {
  const classes = useStyles();
  const match = useRouteMatch(["/account", "/inventory", "/marketplace"]);
  const currentPath = match?.path ?? "/";

  return (
    <nav className={classes.root}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
            <Box display="flex" alignItems="center">
              <img
                className={classes.logo}
                src={
                  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                }
                alt="Bosch Logo"
              />
              <Typography component="span" variant="h5">
                Atomic CRM
              </Typography>
            </Box>
            <Box>
              <Tabs value={currentPath} aria-label="Navigation Tabs">
                <Tab label={"Marketplace"} component={Link} to="/" value="/" />
                <Tab
                  label={"Account"}
                  component={Link}
                  to="/account"
                  value="/account"
                />
                <Tab
                  label={"Inventory"}
                  component={Link}
                  to="/inventory"
                  value="/inventory"
                />
                <Tab
                  label={"Deals"}
                  component={Link}
                  to="/deals"
                  value="/deals"
                />
              </Tabs>
            </Box>
            <Box display="flex">
              {/* <LoadingIndicator />
              <UserMenu logout={<Logout button />} /> */}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Header;
