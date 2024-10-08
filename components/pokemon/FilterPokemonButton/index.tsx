import React from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';

import { capitalize } from '../../../utils/capitalize';
import { colorsByType } from '../../../utils/colorsByType';

const FilterButton = ({ setTypeSelected, customTypes }: any) => {
    const types = customTypes ? customTypes : Object.keys(colorsByType);

    return (
        <FormControl sx={{ background: '#22577a', margin: customTypes ? 0 : '10px', borderRadius: '5px' }}>
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