import { useFormik } from 'formik';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './style.scss';


const DevPanelForm = () => {
    const formik = useFormik({
      initialValues: {
        game_title: '',
        game_cover: '',
        game_description: '',
        game_images_links: '',
        game_token_mint_account: '',
        game_items_mint_accounts: '',       
      },
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
      },
    });

  return (
    <div className='devPanelForm'>
    <form onSubmit={formik.handleSubmit}>
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
          helperText='link to an image (to display it for users and NFTs visualization)'
        />
        <TextField
          fullWidth
          className='devPanelTextField'
          id="game_description"
          name="game_description"
          label="Game description"
          value={formik.values.game_description}
          onChange={formik.handleChange}
          error={formik.touched.game_cover && Boolean(formik.errors.game_description)}
          helperText='link to text description (to display it for users)'
        />
        <TextField
          fullWidth
          className='devPanelTextField'
          id="game_images_links"
          name="game_images_links"
          label="Game images links"
          value={formik.values.game_images_links}
          placeholder='Links'
          onChange={formik.handleChange}
          helperText={`Add links to images separated by comma.list of links to the images (screenshots, or other images to display for users)`}
          error={formik.touched.game_cover && Boolean(formik.errors.game_images_links)}
        />
        <TextField
          fullWidth
          className='devPanelTextField'
          id="game_token_mint_account"
          name="game_token_mint_account"
          label="Game token mint account"
          value={formik.values.game_token_mint_account}
          onChange={formik.handleChange}
          error={formik.touched.game_cover && Boolean(formik.errors.game_token_mint_account)}
          helperText={`mint acc address (optional) to display to user his in-game balance`}
        />
        <TextField
          fullWidth
          className='devPanelTextField'
          id="game_items_mint_accounts"
          name="game_items_mint_accounts"
          label="Game items mint accounts"
          value={formik.values.game_items_mint_accounts}
          onChange={formik.handleChange}
          helperText={`Add account addresses by comma. This is a list of mint account addresses (optional) to display to user his in-game inventory, give a possibility to manage it
          `}
          error={formik.touched.game_cover && Boolean(formik.errors.game_items_mint_accounts)}
        />
      
       
        <Button color="default" variant="contained" fullWidth type="submit">
          Submit
        </Button>
      </form>
    </div>
  )
}


export default DevPanelForm;