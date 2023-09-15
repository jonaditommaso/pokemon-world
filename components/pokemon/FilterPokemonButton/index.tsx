import React from 'react';

import { FormControl, MenuItem, Select } from '@mui/material';

import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';
import { colorsByType } from '../../../utils/colorsByType';

const FilterButton = ({ setTypeSelected }: any) => {

    const types = Object.keys(colorsByType)

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
                        {capitalizeFirstLetter(type)}
                    </MenuItem>
                 ))}
                </Select>
            </FormControl>
    );
}

export default FilterButton;