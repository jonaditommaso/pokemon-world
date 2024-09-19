import { Tooltip } from "@mui/material";
import { useState } from "react";

interface MaterialTooltipProps {
    children: any,
    placement: 'left'
    title: string,
}

const MaterialTooltip = ({ children, placement, title }: MaterialTooltipProps) => {
    const [tooltipOpen, setTooltipOpen] = useState(false);

    const handleClick = () => {
        if (tooltipOpen) {
          setTooltipOpen(false);
        }
      };

      return (
        <Tooltip
          placement={placement}
          title={title}
          open={tooltipOpen}
          onOpen={() => setTooltipOpen(true)}
          onClose={() => setTooltipOpen(false)}
          disableFocusListener
          disableTouchListener

        >
            <span onClick={handleClick}>
                {children}
            </span>
        </Tooltip>
    );
}

export default MaterialTooltip;