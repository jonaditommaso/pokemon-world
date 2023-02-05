import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

interface ThemeProp {
    children: JSX.Element
}

export enum themePalette {
    dark = '#212121',
    light = '#ffffff'
}

const theme = createTheme({
    palette: {
        secondary: {
            main: themePalette.dark
        },
        info: {
            main: themePalette.light
        }
    }
})

export const ThemeConfig = ({ children }: ThemeProp) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)