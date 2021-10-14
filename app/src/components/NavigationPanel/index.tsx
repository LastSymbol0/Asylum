import React from "react"
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';

import { Route } from "../../routes";
import { Typography } from "@material-ui/core";

import telegram from './../../assets/telegramIcon.svg';
import discord from './../../assets/discordIcon.svg';

import placeholder from './../../assets/CryptoPunkAvatar.png';
import editPencil from './../../assets/editPencil.svg';
import { useWallet } from '@solana/wallet-adapter-react';

import './style.scss';


const NavigationPanel = ({ pages }: { pages: Route[] }) => {
    const wallet = useWallet()
    const location = useLocation();
    const currentTab: string = location.pathname;

    const achievements = [
        {
            label: "AnywayLose | \"Interstellar\" | +30exp"
        },
        {
            label: "AnywayLose | \"First kill\"   | +5exp"
        },
        {
            label: "Some Game  | \"Most wanted\"  | +60exp"
        }
    ]

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
            {wallet.connected && <div className="profileContainer">
                <div className="accountInfo">
                    <img className="profileIcon" src={placeholder} alt="profile icon"/>
                    <div>
                        <Typography className="userName">
                            CyberPan
                            <img className="editIcon" src={editPencil} alt="edit"/>
                        </Typography>
                        <Typography>Level 3</Typography>
                    </div>
                </div>
                <div className="achievmentsContainer">
                    <Typography>Last achievements:</Typography>
                    <ul>
                        { achievements.map((ach, i) => {
                                return(
                                    <li key={i}><Typography>{'- ' + ach.label}</Typography></li>
                                )
                        }) }
                    </ul>
                </div>
            </div>}

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
