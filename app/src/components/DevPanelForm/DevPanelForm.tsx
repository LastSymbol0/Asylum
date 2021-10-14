import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss';
import { Typography } from '@material-ui/core';


const DevPanelForm = () => {
    const formik = useFormik({
      initialValues: {
        game_title: ' ',
        game_cover: ' ',
        game_description: ' ',
        game_images_links: ' ',
        game_token_mint_account: ' ',
        game_items_mint_accounts: ' ',
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

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