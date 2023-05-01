import { MenuItem } from '@mui/material';

interface MenuItemProps {
    onClick: () => void,
    text: string,
}

const MenuPokeItem = ({ onClick, text }: MenuItemProps) => {
    return (
        <MenuItem onClick={onClick}>{text}</MenuItem>
     );
}

export default MenuPokeItem;