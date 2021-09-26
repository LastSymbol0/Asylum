import idl from '../idl.json'
import { players } from '../lib'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider } from '@project-serum/anchor'

const programID = new PublicKey(idl.metadata.address)

function PlayersDemo() {
  const [isInitialized, setIsInitialized] = useState(false)

  const [nickname, setNickname] = useState('')
  const [avatar, setAvatar] = useState(PublicKey.default)
  const [games, setGames] = useState([])

  const [inputNickname, setInputNickname] = useState('')
  const [inputAvatar, setInputAvatar] = useState('')
  const [inputGame, setInputGame] = useState('')
  const wallet = useWallet()

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "http://127.0.0.1:8899";
    const opts = { preflightCommitment: "processed" }
    const connection = new Connection(network, opts.preflightCommitment)

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    )
    return provider;
  }

  async function fetchPlayerData() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      const [playerAccountAddress, _] = await players.findPlayerGlobalAccountAddress(wallet.publicKey, programID)
      const account = await program.account.playerAccount.fetch(playerAccountAddress)

      console.log(account)
      setIsInitialized(true)
      setNickname(account.nickname.toString())
      setAvatar(account.avatar.toString())
      setGames(account.games)
    } catch (err) {
      console.log("Player data fetching error: ", err)
    }
  }

  async function initialize() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      await players.initPlayer(program)
      setIsInitialized(true)
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  async function updateNickname() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

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
    const program = new Program(idl, programID, provider)

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
    const program = new Program(idl, programID, provider)

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
    const program = new Program(idl, programID, provider)

    try {
      await players.removeGameFromLibrary(program, new PublicKey(inputGame))
      setInputGame('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchPlayerData()
  }

  useEffect(() => {
    if (wallet.connected) {
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
            !isInitialized && (<button onClick={initialize}>Initialize</button>)
          }

          {
            isInitialized ? (
              <div style={{ width: "fit-content", margin: "0 auto", textAlign: "left" }}>
                <h1>Current player account state</h1>
                <h3>Current nickname: </h3>{nickname}
                <h3>Current avatar: </h3>{avatar.toString()}
                <h3>Current games: </h3>
                {games && games.length !== 0 ? <ul>{games.map((x, i) => <li key={i}>{x.toString()}</li>)}</ul> : "No games so far"}

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
