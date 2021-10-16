import React, { useEffect, useState } from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { Route } from "../../routes";
import { Typography } from "@material-ui/core";

import telegram from './../../assets/telegramIcon.svg';
import discord from './../../assets/discordIcon.svg';
import ProfilePanel from "../ProfilePanel";
import { homepath } from "../../routes";

import './style.scss';
import { useWallet } from "@solana/wallet-adapter-react";


const NavigationPanel = ({ pages }: { pages: Route[] }) => {
    const location = useLocation();
    const currentTab: string = location.pathname;
    const wallet = useWallet()


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
                <Tab disabled={!wallet.connected && x.path !=homepath} disableRipple key={i} label={<Typography variant="body1">{x.name }</Typography>} value={x.path} to={x.path} component={Link} />
            ))}
        </Tabs>

        <div className="bottomContainer">
            <div className="decor-1"> </div>
            
            <ProfilePanel />

            <div className="contactUsContainer">
                <Typography variant="body1">Contact us</Typography>
                <a  href="https://t.me/joinchat/MFpIhiHJoWMyYjAy" target="_blank" >
                    <img className="icon" src={telegram} alt="telegram icon"/>
                </a >
                <a  href="https://discord.gg/eEa3kqZU" target="_blank" >
                    <img className="icon" src={discord} alt="discord icon"/>
                </a >
            </div>
        </div>
    </div>
    )
    
}

export default NavigationPanel;
