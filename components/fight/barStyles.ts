import { linearProgressClasses } from '@mui/material/LinearProgress';

export const barStyles = {
    height: 7,
    borderRadius: 10,
    width: '18rem',
    margin: 'auto',
    marginTop: 4,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: '#00ff70',
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 0,
      backgroundColor: 'red',
    },
}