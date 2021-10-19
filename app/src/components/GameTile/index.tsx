import './style.scss';
import { Typography } from '@mui/material';


const GameTile = ({ image, isAdded = false, disabled = false, loading = false, loadingFailed = false, onAdd = undefined, onLaunch = undefined, onClick }:
    {
        image?: string,
        isAdded?: boolean,
        disabled?: boolean,
        loading?: boolean,
        loadingFailed?: boolean,
        onAdd?: () => void,
        onLaunch?: () => void,
        onClick?: () => void
    }) => {

    return (
        <div onClick={disabled ? undefined : onClick} className='gameItemWrapper'>
            <div className="game" style={{ backgroundImage: `url(${image})`}}>
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