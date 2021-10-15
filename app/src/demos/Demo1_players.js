import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider } from '@project-serum/anchor'
import playersIdl from './../idl/players.json';
import asylumIdl from './../idl/asylum.json';
import {asylum, players} from './../lib'

const playersProgramID = new PublicKey(playersIdl.metadata.address)
const asylumProgramID = new PublicKey(asylumIdl.metadata.address)

function PlayersDemo() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isInitializedGlobal, setIsInitializedGlobal] = useState(false)

  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState(PublicKey.default)
  const [games, setGames] = useState([])
  const [playerAchievements, setPlayerAchievements] = useState([])
  const [exp, setExp] = useState(0)
  const [level, setLevel] = useState(0)

  const [achievements, setAchievements] = useState([])

  const [inputNickname, setInputNickname] = useState('')
  const [inputAvatar, setInputAvatar] = useState('')
  const [inputGame, setInputGame] = useState('')
  const [inputAchievements, setInputAchievements] = useState('')
  const [inputAchievementsExp, setInputAchievementsExp] = useState(0)
  const [inputExp, setInputExp] = useState(0)
  const wallet = useWallet()

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.devnet.solana.com";
    const opts = { preflightCommitment: "processed" }
    const connection = new Connection(network, opts.preflightCommitment)

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    )
    return provider;
  }

  async function fetchGlobalData() {
    const provider = await getProvider()
    const program = new Program(asylumIdl, asylumProgramID, provider)

    try {
      const [achievementsAccountAddress, _] = await asylum.findAchievementsAccountAddress(asylumProgramID)
      const account = await program.account.achievementsAccount.fetch(achievementsAccountAddress)

      console.log(account)
      setIsInitializedGlobal(true)
      setAchievements(account.achievements)
    } catch (err) {
      console.log("Achievements data fetching error: ", err)
    }
  }


  async function fetchPlayerData() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      const [playerAccountAddress, _] = await players.findPlayerGlobalAccountAddress(wallet.publicKey, playersProgramID)
      const account = await program.account.playerAccount.fetch(playerAccountAddress)

      console.log(account)
      setIsInitialized(true)
      setNickname(account.nickname.toString())
      setAvatar(account.avatar.toString())
      setGames(account.games)
      setPlayerAchievements(account.achievements)
      setExp(account.exp)
      setLevel(account.level)
    } catch (err) {
      console.log("Player data fetching error: ", err)
    }
  }

  async function initializePlayer() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      console.log(program)
      await players.initPlayer(program)
      setIsInitialized(true)
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }


  async function initializeGlobal() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      console.log(program)
      await asylum.initAsylumAccounts(program)
      setIsInitializedGlobal(true)
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchGlobalData()
  }

  async function updateNickname() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.updatePlayerNickname(program, inputNickname)
      setInputNickname('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function updateAvatar() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.updatePlayerAvatar(program, new PublicKey(inputAvatar))
      setInputAvatar('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function addGame() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.addGameToLibrary(program, new PublicKey(inputGame))
      setInputGame('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function removeGame() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.removeGameFromLibrary(program, new PublicKey(inputGame))
      setInputGame('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function addAchievement() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.addAchievement(program, inputAchievements, inputAchievementsExp)
      setInputAchievements('')
      setInputAchievementsExp('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function addExp() {
    const provider = await getProvider()
    const program = new Program(playersIdl, playersProgramID, provider)

    try {
      await players.addExp(program, inputExp)
      setInputExp('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  useEffect(() => {
    if (wallet.connected) {
      try {
        fetchGlobalData()
      } catch (e) {
        if (isInitializedGlobal) {
          console.error(e)
        }
      }

      try {
        fetchPlayerData()
      } catch (e) {
        if (isInitialized) {
          console.error(e)
        }
      }
    }
  }, [wallet.connected])

  return (
    !wallet.connected
      ?
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <WalletMultiButton />
      </div>
      :
      <div className="App">
        <div>
          {
            !isInitializedGlobal && (<button onClick={initializeGlobal}>Initialize global</button>)
          }

          {
            isInitializedGlobal && !isInitialized && (<button onClick={initializePlayer}>Initialize</button>)
          }

          {
            isInitializedGlobal && isInitialized ? (
              <div style={{ width: "fit-content", margin: "0 auto", textAlign: "left" }}>
                <h1>Current player account state</h1>
                <h3>Current nickname: </h3>{nickname}
                <h3>Current avatar: </h3>{avatar.toString()}
                <h3>Current games: </h3>
                {games && games.length !== 0 ? <ul>{games.map((x, i) => <li key={i}>{x.toString()}</li>)}</ul> : "No games so far"}
                <h3>Achievements: </h3>
                {playerAchievements && playerAchievements.length !== 0 ?
                  <ul>{playerAchievements.map((x, i) =>
                  {
                    const achievement = achievements.find(item => item.id === i);
                    const display = achievement
                      ? `${achievement.label} - ${achievement.description} | Game: ${achievement.game.toString()}`
                      : `id: ${x}`
                    return <li key={i}>{display}</li>
                  })}
                  </ul>
                  : "No achievements so far"}
                <h3>Current level: </h3>{level}
                <h3>Current exp: </h3>{exp}

                <h1 style={{ marginTop: 60 }}>Edit</h1>

                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="New nickname (string, 32 bytes)"
                    onChange={e => setInputNickname(e.target.value)}
                    value={inputNickname}
                  />
                  <button onClick={updateNickname}>Set nickname</button>
                </div>

                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="New avatar (any Public key)"
                    onChange={e => setInputAvatar(e.target.value)}
                    value={inputAvatar}
                  />
                  <button onClick={updateAvatar}>Set avatar</button>
                </div>

                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="Game id (any Public key)"
                    onChange={e => setInputGame(e.target.value)}
                    value={inputGame}
                  />
                  <button onClick={addGame}>Add game</button>
                  <button onClick={removeGame}>Remove game</button>
                </div>

                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="Achievement id (u16)"
                    onChange={e => setInputAchievements(e.target.value)}
                    value={inputAchievements}
                  />
                  <input
                    style={{ width: 200 }}
                    placeholder="Exp to add (optional) (u32)"
                    onChange={e => setInputAchievementsExp(e.target.value)}
                    value={inputAchievementsExp}
                  />
                  <button onClick={addAchievement}>Add achievement</button>
                </div>
                
                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="Exp to add (u32)"
                    onChange={e => setInputExp(e.target.value)}
                    value={inputExp}
                  />
                  <button onClick={addExp}>Add exp</button>
                </div>

              </div>
            ) : (
              <h3>Please inialize your account.</h3>
            )
          }
        </div>
      </div>
  )
}

export default PlayersDemo
