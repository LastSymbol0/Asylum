import idl from '../idl/asylum.json'
import { players, asylum } from '../lib'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Connection, PublicKey } from '@solana/web3.js'
import { Program, Provider } from '@project-serum/anchor'

const programID = new PublicKey(idl.metadata.address)


function PlayersDemo() {
  const [isInitialized, setIsInitialized] = useState(false)

  const [achievements, setAchievements] = useState([])

  const [inputAchievementName, setInputAchievementName] = useState('')
  const [inputAchievementDescription, setInputAchievementDescription] = useState('')
  const [inputAchievementGame, setInputAchievementGame] = useState('')
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

  async function fetchAchievements() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      const [achievementsAccountAddress, _] = await asylum.findAchievementsAccountAddress(programID)
      const account = await program.account.achievementsAccount.fetch(achievementsAccountAddress)

      console.log(account)
      setIsInitialized(true)
      setAchievements(account.achievements)
    } catch (err) {
      console.log("Achievements data fetching error: ", err)
    }
  }


  async function initializeGlobal() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      console.log(program)
      await asylum.initAsylumAccounts(program)
      setIsInitialized(true)
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchAchievements()
  }

  async function addAchievement() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      await asylum.addAchievement(program, inputAchievementName, inputAchievementDescription, new PublicKey(inputAchievementGame))
      setInputAchievementName('')
      setInputAchievementDescription('')
      setInputAchievementGame('')
    } catch (err) {
      console.log("Transaction error: ", err)
    }

    fetchAchievements()
  }

  useEffect(() => {
    if (wallet.connected) {
      try {
        fetchAchievements()
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
            !isInitialized && (<button onClick={initializeGlobal}>Initialize global</button>)
          }

          {
            isInitialized ? (
              <div style={{ width: "fit-content", margin: "0 auto", textAlign: "left" }}>
                <h3>Achievements: </h3>
                {achievements && achievements.length !== 0 ? <ul>{achievements.map((x, i) => <li key={i}>{`${x.label} - ${x.description} | Game: ${x.game.toString()}`}</li>)}</ul> : "No achievements so far"}

                <h1 style={{ marginTop: 60 }}>Edit</h1>

                <div>
                  <input
                    style={{ width: 200 }}
                    placeholder="Achievement label (String 32)"
                    onChange={e => setInputAchievementName(e.target.value)}
                    value={inputAchievementName}
                  />
                  <input
                    style={{ width: 200 }}
                    placeholder="Achievement description (String 64)"
                    onChange={e => setInputAchievementDescription(e.target.value)}
                    value={inputAchievementDescription}
                  />
                  <input
                    style={{ width: 200 }}
                    placeholder="Game id (any Public key)"
                    onChange={e => setInputAchievementGame(e.target.value)}
                    value={inputAchievementGame}
                  />
                  <button onClick={addAchievement}>Add achievement</button>
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
