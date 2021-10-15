import DevPanelForm from "../components/DevPanelForm/DevPanelForm";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import * as React from 'react';
import { useTheme } from "@material-ui/core";

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
      Open Popover
    </Button>
    <DevPanelPopover isOpen={!!anchorEl} anchorEl={anchorEl} handleClose={handleClose}/>
    </>);
}


const DevPanelPopover = (
  { isOpen, anchorEl, handleClose }:
  {
    isOpen: boolean,
    anchorEl: Element | null,
    handleClose: () => void
  }) => {
  const theme = useTheme();


  return (
    <Popover
      id='popover-dev -panel'
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'center',
      }}
      style={{ width: '80%' }}
    >
      <div style={{ backgroundColor: theme.palette.background.default, border: "1px solid", borderColor: theme.palette.secondary.main }}>
        <DevPanelForm />
      </div>
    </Popover>)
}


export default DevPanelPopover;