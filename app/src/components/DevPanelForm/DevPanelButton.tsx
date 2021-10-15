import DevPanelPopover from "./DevPanelPopover";
import Button from '@mui/material/Button';
import * as React from 'react';

const DevPanelButton = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    <Button variant="contained" onClick={handleClick}>
      Add new game
    </Button>
    <DevPanelPopover isOpen={!!anchorEl} anchorEl={anchorEl} handleClose={handleClose}/>
    </>);
}

export default DevPanelButton;