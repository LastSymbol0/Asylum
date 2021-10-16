import React from "react"
import logo from './../../assets/logo.svg';
import settingsIcon from './../../assets/settingsIcon.svg'
import './style.scss';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { homepath } from "../../routes";
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';


const Icon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="8" viewBox="0 0 8 8" fill="none">
        <path d="M0.20001 5.86285L0.25001 7.21143L2.10001 5.38285C3.12001 4.36571 3.98001 3.54285 4.02001 3.54285C4.06001 3.54285 4.91001 4.36571 5.92001 5.37143C6.93001 6.37714 7.77001 7.2 7.80001 7.2C7.83001 7.2 7.83001 6.56 7.80001 5.77143L7.75001 4.34285L5.90001 2.51428C4.89001 1.50857 4.03001 0.685711 4.00001 0.685711C3.94001 0.685711 0.41001 4.16 0.25001 4.37714C0.19001 4.45714 0.17001 5.04 0.20001 5.86285Z" fill="white"/>
        </svg>
    )
}

const Header = () => {
    const [lang, setLang] = React.useState('EN');
    const wallet = useWallet()

    const handleChange = (event: SelectChangeEvent) => {
        setLang(event.target.value);
    };

    return (
        <div>
            <div className="HeaderWrapper">
                <Link to={homepath}>
                    <img src={logo} alt='logo'/>
                </Link>
            <div className="HeaderRight">

                <FormControl fullWidth>
                    <Select
                        autoWidth
                        id="demo-simple-select"
                        displayEmpty={false}
                        value={lang}
                        onChange={handleChange}
                        defaultValue='EN'
                        variant='standard'
                        IconComponent={Icon}
                    >
                        <MenuItem value={'EN'}>
                            <Typography variant="body1">EN</Typography>
                        </MenuItem>
                        {/* <MenuItem value={'RU'}>
                            <Typography variant="body1">RU</Typography>
                        </MenuItem> */}
                    </Select>
                </FormControl>

                <div className="settingButtons">
                    <img src={settingsIcon} alt="settingsIcon" />
                </div>
                <Typography>[Devnet]</Typography>
                
               
                <div className="connectWallerButton">
                    <WalletMultiButton />
                    
                </div> 
            </div>
        </div>
        </div>
        
    )
    
}
/*J7WQvF...Rf3A*/
export default Header;
