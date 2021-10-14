import './style.scss';
import { Typography } from '@mui/material';


const GameTile = ({ image, isAdded = false, disabled = false, loading = false, loadingFailed = false, onAdd = undefined, onLaunch = undefined }:
    {
        image?: string,
        isAdded?: boolean,
        disabled?: boolean,
        loading?: boolean,
        loadingFailed?: boolean,
        onAdd?: () => void,
        onLaunch?: () => void
    }) => {

    return (
        <div className='gameItemWrapper'>
            <div className="game" style={{ background: `url(${image})` }}>
                {isAdded
                    ?
                    <div className={"tileButton launchButton " + (disabled ? "disabled" : "active") } onClick={disabled ? undefined : onLaunch}>
                        <Typography variant="caption">Launch</Typography>
                    </div>
                    :
                    <div className={"tileButton addButton " + (disabled ? "disabled" : "active")} onClick={disabled ? undefined : onAdd}>
                        <Typography variant="caption" onClick={disabled ? onAdd : undefined}>Add</Typography>
                    </div>
                }
            </div>
        </div>
    )
}

export default GameTile;