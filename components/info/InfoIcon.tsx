import React from 'react';

import { Popover, Typography } from '@mui/material';
import { BsInfoCircle } from 'react-icons/bs';

type InfoIconProps = {
    description: string
}

const InfoIcon = ({ description }: InfoIconProps) => {
    const [anchorEl, setAnchorEl] = React.useState<SVGElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<SVGElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

    return (
        <div style={{ display: 'flex' }}>
            <BsInfoCircle
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                style={{ color: '#22577a' }}
            />
            <Popover
                id="mouse-over-popover"
                    sx={{
                    pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
            >
                <Typography sx={{ p: 1 }}>{description}</Typography>
            </Popover>
        </div>
    );
}

export default InfoIcon;