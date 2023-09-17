import { Button } from "@mui/material";

interface ButtonProps {
    onClick: () => void,
    text: string,
    style?:  React.CSSProperties,
    disabled?: boolean,
}

const SecondaryButton = ({ onClick, text, style, disabled }: ButtonProps) => {
    return (
        <Button
            variant='contained'
            color='error'
            onClick={onClick}
            style={style}
            disabled={disabled}
        >
            {text}
        </Button>
    );
}

export default SecondaryButton;