import React from "react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Link, useRouteMatch } from 'react-router-dom';

import { Route } from "../../routes";

const NavigationPanel = ({ pages }: { pages: Route[] }) => {
    const routeMatch = useRouteMatch(pages.map(x => x.path));
    const currentTab = routeMatch?.path;

    return <Tabs orientation="vertical"
        variant='fullWidth'
        value={currentTab}
    >
        {pages.map(((x, i) =>
            <div style={{marginTop: '20px'}}>
                <Tab label={x.name} value={x.path} to={x.path} component={Link} />
            </div>))}
    </Tabs>
}

export { NavigationPanel }
