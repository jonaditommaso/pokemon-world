import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Button, { ButtonProps } from '@mui/material/Button';

export const CustomButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
      backgroundColor: grey[800],
    },
}));