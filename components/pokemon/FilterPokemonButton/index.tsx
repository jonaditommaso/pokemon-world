import React from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';

import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';

const FilterButton = ({ setTypeSelected }: any) => {
    const types = Object.keys(colorsByType);

    return (
        <FormControl sx={{ background: '#22577a', margin: '10px', borderRadius: '5px' }}>
            <Select
                size='small'
                displayEmpty
                renderValue={() => <em>Filter by type</em>}
                sx={{
                    color: 'white',
                    '.MuiSvgIcon-root ': {
                        fill: "white !important",
                    },
                    height: '35px',
                }}
            >
                {types.map((type: any): any => (
                    <MenuItem key={type} onClick={() => setTypeSelected(type)}>
                        {capitalize(type)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default FilterButton;