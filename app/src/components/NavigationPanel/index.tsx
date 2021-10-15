import React, { useEffect, useState } from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { Route } from "../../routes";
import { Typography } from "@material-ui/core";

import telegram from './../../assets/telegramIcon.svg';
import discord from './../../assets/discordIcon.svg';
import ProfilePanel from "../ProfilePanel";

import './style.scss';


const NavigationPanel = ({ pages }: { pages: Route[] }) => {
    const location = useLocation();
    const currentTab: string = location.pathname;


    return (
        <div className="NavigationPanelWrapper">
        <Tabs orientation="vertical"
            variant='fullWidth'
            value={currentTab}
            textColor="primary"
            classes={{
                indicator: "myIndicator"
              }}
            style={{width: "100%"}}
        >
            {pages.map(((x, i) =>
                <Tab disableRipple key={i} label={<Typography variant="body1">{x.name }</Typography>} value={x.path} to={x.path} component={Link} />
            ))}
        </Tabs>

        <div className="bottomContainer">
            <div className="decor-1"> </div>
            
            <ProfilePanel />

            <div className="contactUsContainer">
                <Typography variant="body1">Contact us</Typography>
                <Link to={{ pathname: "https://" }} target="_blank" >
                    <img className="icon" src={telegram} alt="telegram icon"/>
                </Link>
                <Link to={{ pathname: "https://" }} target="_blank" >
                    <img className="icon" src={discord} alt="discord icon"/>
                </Link>
            </div>
        </div>
    </div>
    )
    
}

export default NavigationPanel;
