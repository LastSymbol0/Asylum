import idl from '../idl/asylum.json'
import { players, asylum } from '../lib'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useEffect, useState } from 'react'
import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { Program, Provider } from '@project-serum/anchor'
import { decodeMasterEdition, decodeMetadata, getMetadata } from '@oyster/common'

// import { createShipMasterNFT } from '../lib/metaplex'
// import { mintNFT } from '../lib/cli/src/commands/mint-nft'
// import { mintNFT_ } from '../lib/cli/src/commands/mint-nft-custom'
// import { createMetaplexMetadata } from '../lib/helpers'
import { mintNFT as mintNFT_web } from '../lib/metaplex/packages/web/src/actions/nft'
import { fetchGamesNfts } from '../nft-store/games/thunks'

const programID = new PublicKey(idl.metadata.address)


function GamesDemo() {
  const [isInitialized, setIsInitialized] = useState(false)

  const [games, setGames] = useState([])

  const [nftCreateProgress, setNFTcreateProgress] = useState(0)
  const wallet = useWallet()


  useEffect(() => {
    console.log(nftCreateProgress);
  }, [nftCreateProgress])

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    // const network = "http://localhost:8899";
    const network = "https://api.devnet.solana.com";
    const opts = { preflightCommitment: "processed" }
    const connection = new Connection(network, opts.preflightCommitment)

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    )
    return provider;
  }

  async function fetchGames() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      const [gamessAccountAddress, _] = await asylum.findGamesCatalogAccountAddress(programID)
      const account = await program.account.gamesCatalogAccount.fetch(gamessAccountAddress)

      console.log(account)
      setIsInitialized(true)
      setGames(account.games)
    } catch (err) {
      console.log("Games data fetching error: ", err)
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

    fetchGames()
  }

  async function addGame() {
    const provider = await getProvider()
    const program = new Program(idl, programID, provider)

    try {
      await asylum.addGameToCatalog(program, new PublicKey("37zew4JheuWMQy3QfNmRaUfqpqaWJNoJwtX4Wbm8BdVY"))
        // const keypair =  Keypair.generate();
        // const metadata =  createMetaplexMetadata(
        //   "Name hosted meta",
        //   "",
        //   "Desc hosted meta",
        //   "https://raw.githubusercontent.com/LastSymbol0/Asylum_AnywayLose/536051b73f2a3021875188890fd48a1186ccd67a/public/pic/unit.svg",
        //   "image",
        //   [{ address: wallet.publicKey.toString(), share: 100 }]) ;
        // console.log("meta", metadata)

        // console.log("mintNFT_web")


        // mintNFT_web(provider.connection, wallet, "devnet", [], {
        //   name: "Test 2 Name",
        //   symbol: "TST",
        //   description: "My test NFT",
        //   image: "https://raw.githubusercontent.com/LastSymbol0/Asylum_AnywayLose/536051b73f2a3021875188890fd48a1186ccd67a/public/pic/unit.svg",
        //   animation_url: undefined,
        //   attributes: undefined,
        //   external_url: "",
        //   properties: undefined,
        //   creators: null,
        //   sellerFeeBasisPoints: 0
        // },
        // setNFTcreateProgress).catch(e => console.log(e))

        // console.log("2. mintNFT_", wallet.publicKey.toString())

        // mintNFT_(provider.connection, wallet, metadata, true);



        // createShipMasterNFT(
        //     Keypair.generate(),
        //     provider.connection,
        //     wallet.publicKey,
        //     {
        //         name: "d",
        //         symbol: "a",
        //         uri: "c"
        //     })


    } catch (err) {
        console.log("Transaction error: ", err)
    }

    fetchGames()
  }

  async function updateNft() {
    const provider = await getProvider()

    const fetchNft = async (connection, mint) => {
      const metaAddress = await getMetadata(mint.toString());
      const buffer = await connection.getAccountInfo(new PublicKey(metaAddress))
      console.log("start2")

      if (!buffer)
          throw Error("getAccountInfo returns invalid data")

      // const metadataMaster = decodeMasterEdition(buffer.data)
      const metadata = decodeMetadata(buffer.data)
      // console.log("fetched meta master", metadataMaster)
      console.log("fetched meta", metadata)

      const resp = await fetch(metadata.data.uri)
      console.log("resp", resp.json())
    }

    try {
      fetchNft(provider.connection, new PublicKey("37zew4JheuWMQy3QfNmRaUfqpqaWJNoJwtX4Wbm8BdVY"))
    } catch (err) {
        console.log("Transaction error: ", err)
    }

    fetchGames()
  }

  useEffect(() => {
    if (wallet.connected) {
      try {
        fetchGames()
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
                <h3>Games: </h3>
                {games && games.length !== 0 ? <ul>{games.map((x, i) => <li key={i}>{`Game: ${x.toString()}`}</li>)}</ul> : "No games so far"}

                <h1 style={{ marginTop: 60 }}>Edit</h1>

                  <button onClick={addGame}>Add game</button>
                  <button onClick={updateNft}>upd</button>


              </div>
            ) : (
              <h3>Please inialize your account.</h3>
            )
          }
        </div>
      </div>
  )
}

export default GamesDemo


const a = {
  "name": "Solflare X NFT",
  "symbol": "",
  "description": "Celebratory Solflare NFT for the Solflare X launch",
  "seller_fee_basis_points": 0,
  "image": "https://www.arweave.net/abcd5678?ext=png",
  "animation_url": "https://www.arweave.net/efgh1234?ext=mp4",
  "external_url": "https://solflare.com",
  "attributes": [
    {
      "trait_type": "web",
      "value": "yes"
    },
    {
      "trait_type": "mobile",
      "value": "yes"
    },
    {
      "trait_type": "extension",
      "value": "yes"
    }
  ],
  "collection": {
    "name": "Solflare X NFT",
    "family": "Solflare"
  },
  "properties": {
    "files": [
      {
        "uri": "https://www.arweave.net/abcd5678?ext=png",
        "type": "image/png"
      },
      {
        "uri": "https://watch.videodelivery.net/9876jkl",
        "type": "unknown",
        "cdn": true
      },
      {
        "uri": "https://www.arweave.net/efgh1234?ext=mp4",
        "type": "video/mp4"
      }
    ],
    "category": "video",
    "creators": [
      {
        "address": "SOLFLR15asd9d21325bsadythp547912501b",
        "share": 100
      }
    ]
  }
}
