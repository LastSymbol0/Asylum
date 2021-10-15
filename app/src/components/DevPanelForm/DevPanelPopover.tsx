import DevPanelForm from "./DevPanelForm";
import Popover from '@mui/material/Popover';
import { useTheme } from "@material-ui/core";

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
    >
      <div style={{width: '50%', backgroundColor: theme.palette.background.default, border: "1px solid", borderColor: theme.palette.secondary.main, position: 'fixed', top: '10%', left: '30%' }}>
        <DevPanelForm />
      </div>
    </Popover>)
}


export default DevPanelPopover;