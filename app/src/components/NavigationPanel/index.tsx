import React from "react"
import Tabs from '@mui/material/Tabs';
import LinkTab from '@mui/material/Tab';

import { Route } from "../../routes";

const NavigationPanel = ({ pages }: { pages: Route[] }) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (_: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    }

    return <Tabs orientation="vertical"
        variant='fullWidth'
        value={value}
        onChange={handleChange}
        // sx={{ borderRight: 1, borderColor: 'divider' }}
    >
        {pages.map(((x, i) =>
            <div style={{marginTop: '20px'}}>
                <LinkTab label={x.component.name} href={x.path} id={`vertical-tab-${i}`} />
            </div>))}
    </Tabs>
}



export { NavigationPanel }
