import './style.scss'
import placeholder from './../../assets/CryptoPunkAvatar.png';
import editPencil from './../../assets/editPencil.svg';
import { useWallet } from '@solana/wallet-adapter-react';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import { asylum, players } from './../../lib'
import { useAsylumProgram, usePlayersProgram } from "../../app/hooks";
import { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { selectNftGames } from '../../nft-store/games/gamesNftStore';
import { fetchGamesLibraryAndLoadNfts } from '../../pages/Library/store/thunks';
import { fetchGamesNfts } from '../../nft-store/games/thunks';
import { PublicKey } from "@solana/web3.js"

type ActionStatus = "INIT" | "PENDING" | "FINISHED" | "FAILED";

const ProfilePanel = () => {
    const wallet = useWallet()

    const player = usePlayersProgram()
    const asylumProgram = useAsylumProgram()
    const dispatch = useDispatch();
    const [isInitialized, setIsInitialized] = useState(false)
    const [playerDataLoadingSatus, setPlayerDataLoadingSatus] = useState<ActionStatus>("INIT")
    const [achievementsLoadingSatus, setAchievementsLoadingSatus] = useState<ActionStatus>("INIT")

    const [nickname, setNickname] = useState('')
    const [inputNickname, setInputNickname] = useState('')
    const [nicknameChangingModeOn, setnicknameChangingModeOn] = useState(false)

    const [playerAchievements, setPlayerAchievements] = useState([]);
    const [catalogPlayerAchievements, setCatalogPlayerAchievements] = useState([]);

    const [level, setLevel] = useState(0)

    const gamesData = useSelector((state: RootState) => selectNftGames(state, [...playerAchievements]))


    useEffect(() => {
        if (playerDataLoadingSatus === "INIT")
            fetchPlayerData();

    }, [player, playerDataLoadingSatus])

    useEffect(()=>{
        if (achievementsLoadingSatus === "INIT")
            fetchAchievementsData()

    }, [player])

    useEffect(() => {
        setInputNickname(nickname);
    }, [nicknameChangingModeOn, nickname])


    async function fetchPlayerData() {
        if (!player)
            return

        try {
            setPlayerDataLoadingSatus("PENDING")
            const [playerAccountAddress, _] = await players.findPlayerGlobalAccountAddress(player?.provider.wallet.publicKey, player?.programId)
            const account = await player.account.playerAccount.fetch(playerAccountAddress)

            console.log(account)
            setIsInitialized(true)
            setNickname(account.nickname.toString())
            setPlayerDataLoadingSatus("FINISHED")
            setnicknameChangingModeOn(false)

            setPlayerAchievements(account.achievements);
            setLevel(account.level)
            
        } catch (err) {
            setPlayerDataLoadingSatus("FAILED")
            console.log("Player data fetching error: ", err)
        }
    }

    async function fetchAchievementsData() {
        if (!asylumProgram)
            return

        try {
            setAchievementsLoadingSatus("PENDING")
            const [achievementsAccountAddress, _] = await asylum.findAchievementsAccountAddress(asylumProgram?.programId)
            const account = await asylumProgram.account.achievementsAccount.fetch(achievementsAccountAddress)

            console.log(account)
            const a = account.achievements
            // setIsInitialized(true)
            // setNickname(account.nickname.toString())
            setAchievementsLoadingSatus("FINISHED")
            // setnicknameChangingModeOn(false)

            setCatalogPlayerAchievements(account.achievements);
            console.log('fetched achievents ', account.achievements)


            await dispatch(fetchGamesNfts({
                connection: asylumProgram.provider.connection,
                mints: account.achievements.map((x: any) => new PublicKey(x.game))
            }))
            // setLevel(account.level)
            
        } catch (err) {
            setAchievementsLoadingSatus("FAILED")
            console.log("Player data fetching error: ", err)
        }
    }

    async function updateNickname() {

        if (!player)
            return
        try {
            await players.updatePlayerNickname(player, inputNickname)
        } catch (err) {
            console.log("Transaction error: ", err)
        }

        fetchPlayerData()
    }

    async function declineNicknameChanges() {
        setnicknameChangingModeOn(false);
        setInputNickname('');
    }

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


    return (<>
        {wallet.connected && <div className="profileContainer">
            <div className="accountInfo">
                <img className="profileIcon" src={placeholder} alt="profile icon" />

                <div className={`nicknameChangingBox ${nicknameChangingModeOn ? '' : 'notVisible'}`}>
                    <input
                        style={{ width: 110 }}
                        placeholder="New nickname (string, 32 bytes)"
                        onChange={e => setInputNickname(e.target.value)}
                        value={inputNickname}
                    />

                    <CheckIcon className='actionIcon' onClick={updateNickname} />
                    <ClearIcon className='actionIcon' onClick={declineNicknameChanges} />
                </div>


                <div className={nicknameChangingModeOn ? 'notVisible' : ''}>
                    <Typography className="userName">
                        {nickname}
                        <img onClick={() => {
                            setnicknameChangingModeOn(true)
                        }
                        } className="editIcon" src={editPencil} alt="edit" />
                    </Typography>
                    <Typography>Level {level}</Typography>
                </div>

            </div>

            <div className="achievmentsContainer">
                <Typography>Last achievements:</Typography>
                <ul>
                    {playerAchievements
                        .filter(ach => catalogPlayerAchievements.find((x:any) => x.id === ach))
                        .map((ach, i) => {
                        const achievementData = catalogPlayerAchievements.find((x:any) => x.id == ach) as any | undefined
                        console.log('gamesData: ', gamesData)
                        return (<>
                            
                            {!!achievementData && i < 3 && (<li key={i}><Typography>{`${achievementData.label} - ${achievementData.description} | Game: ${gamesData[achievementData.game.toString()]?.game?.title}`}</Typography></li>)}
                            </>
                        )
                    })}
                </ul>
            </div>
        </div>}
    </>)
}

export default ProfilePanel;