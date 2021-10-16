import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss';
import { Typography } from '@material-ui/core';
import { Connection, PublicKey, Keypair } from '@solana/web3.js'
import { useAnchorWallet, useWallet } from '@solana/wallet-adapter-react';
import { useAnchorProvider, useAsylumProgram } from '../../app/hooks';
import { mintNFT } from '../../lib/metaplex/packages/web/src/actions/nft'
import { useEffect, useState } from 'react';
import { addGameToCatalog } from '../../lib/asylum';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { fetchGamesCatalogAndLoadNfts } from '../../pages/GamesStore/store/thunks';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const DevPanelForm = () => {
  const provider = useAnchorProvider()
  const wallet = useAnchorWallet()
  const asylumProgram = useAsylumProgram()
  const [NFTcreationProgress, setNFTcreationProgress] = useState(0)
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("NFTcreationProgress", NFTcreationProgress)
  }, [NFTcreationProgress])

  async function addGame({
    title,
    description,
    cover,
    launch_url,
    images_links,
    token_mint_account,
    items_mint_accounts,
  } : {
    title: string,
    description: string,
    cover: string,
    launch_url: string,
    images_links: string[],
    token_mint_account?: PublicKey,
    items_mint_accounts?: PublicKey[],
  }) {
    if (!provider || !wallet || !asylumProgram)
      return;

    console.log("mintNFT")

    return mintNFT(provider.connection, wallet, "devnet", [], {
      name: title,
      symbol: "XXX", //?
      description: description,
      image: cover,
      animation_url: undefined,
      attributes: undefined,
      external_url: "",
      properties: {
        images_links,
        token_mint_account,
        items_mint_accounts,
        launch_url,
        validation_level: 0,
      },
      creators: null,
      sellerFeeBasisPoints: 0
    },
      setNFTcreationProgress)
    .then(async (x) => {
      await addGameToCatalog(asylumProgram, new PublicKey(x.mintAccount))
      dispatch(fetchGamesCatalogAndLoadNfts(asylumProgram))
    })
    .catch((e: any) => console.log(e))
    .finally(() => setNFTcreationProgress(100))
  }

  const formik = useFormik({
    initialValues: {
      game_title: 'GameTitle',
      game_cover: 'https://upload.wikimedia.org/wikipedia/ru/archive/1/16/20210909030507%21%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%B8%D0%B3%D1%80%D1%8B_Control.jpg',
      game_launch_url: 'https://upload.wikimedia.org/wikipedia/ru/archive/1/16/20210909030507%21%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%B8%D0%B3%D1%80%D1%8B_Control.jpg',
      game_description: 'Some game description',
      game_images_links: 'https://upload.wikimedia.org/wikipedia/ru/archive/1/16/20210909030507%21%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%B8%D0%B3%D1%80%D1%8B_Control.jpg, https://upload.wikimedia.org/wikipedia/ru/archive/1/16/20210909030507%21%D0%9E%D0%B1%D0%BB%D0%BE%D0%B6%D0%BA%D0%B0_%D0%B8%D0%B3%D1%80%D1%8B_Control.jpg',
      game_token_mint_account: '',
      game_items_mint_accounts: '',
    },
    onSubmit: (values) => {
      addGame({
        title: values.game_title,
        cover: values.game_cover,
        launch_url: values.game_launch_url,
        description: values.game_description,
        images_links: values.game_images_links.split(','),
        token_mint_account: values.game_token_mint_account ? new PublicKey(values.game_token_mint_account) : undefined,
        items_mint_accounts: values.game_items_mint_accounts ? values.game_items_mint_accounts.split(',').map(x => new PublicKey(x)) : undefined,
      })
    },
  });

  if (NFTcreationProgress > 0)
  {
    return (
    <div className='devPanelForm'>
      <Typography variant="h5" style={{paddingBottom: "20px"}}>
        {NFTcreationProgress < 100 ? "NFT minting in progress..." : "Done!"}
      </Typography>
      <LinearProgressWithLabel value={NFTcreationProgress} />
    </div>)
  }

  return (
    <div className='devPanelForm'>
      <Typography variant="h4">
        New game
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_title"
            name="game_title"
            label="Game title"
            placeholder='game title'
            value={formik.values.game_title}
            onChange={formik.handleChange}
            error={formik.touched.game_title && Boolean(formik.errors.game_title)}
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_cover"
            name="game_cover"
            label="Game cover"
            value={formik.values.game_cover}
            placeholder={`link to your game's image`}
            onChange={formik.handleChange}
            error={formik.touched.game_cover && Boolean(formik.errors.game_cover)}
            helperText='Link to an image (will be used as NFT image)'
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_launch_url"
            name="game_launch_url"
            label="Game launch url"
            value={formik.values.game_launch_url}
            placeholder={`link to your game`}
            onChange={formik.handleChange}
            error={formik.touched.game_launch_url && Boolean(formik.errors.game_launch_url)}
            helperText='Link to your game'
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_description"
            name="game_description"
            label="Game description"
            value={formik.values.game_description}
            onChange={formik.handleChange}
            error={formik.touched.game_cover && Boolean(formik.errors.game_description)}
            helperText='link to text description (will be used as NFT description)'
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_images_links"
            name="game_images_links"
            label="Game images links"
            value={formik.values.game_images_links}
            placeholder='Links'
            onChange={formik.handleChange}
            helperText={`Links list separated by comma. Could be screenshots, arts, or any other images`}
            error={formik.touched.game_cover && Boolean(formik.errors.game_images_links)}
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_token_mint_account"
            name="game_token_mint_account"
            label="Game token mint account"
            value={formik.values.game_token_mint_account}
            onChange={formik.handleChange}
            error={formik.touched.game_cover && Boolean(formik.errors.game_token_mint_account)}
            helperText={`[Optional] In-game token mint address. Will be used to display user's in-game balance`}
          />
        </div>
        <div className='devPanelInputField' >
          <TextField
            fullWidth
            className='devPanelTextField'
            id="game_items_mint_accounts"
            name="game_items_mint_accounts"
            label="Game items mint accounts"
            value={formik.values.game_items_mint_accounts}
            onChange={formik.handleChange}
            helperText={`[Optional] List of mint address for in-game items, separeted by comma`}
            error={formik.touched.game_cover && Boolean(formik.errors.game_items_mint_accounts)}
          />
        </div>


        <Button color="default" variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}


export default DevPanelForm;