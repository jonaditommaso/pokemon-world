import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { colorsByType } from '../../../utils/colorsByType';

const FilterButton = ({setOptionSelected}: any) => {

    const types = Object.keys(colorsByType)

    return (
        <>
            <DropdownButton
                id="dropdown-basic-button"
                title="Filter by type"
                variant="info"
                style={{margin: '10px'}}
            >
                {types.map((type: any): any => (
                    <Dropdown.Item key={type} onClick={() => setOptionSelected(type)}>{type}</Dropdown.Item>
                ))}
            </DropdownButton>
        </>
    );
}

export default FilterButton;