import { ReactNode } from "react";

import { buttonClasses, createTheme, CssBaseline, ThemeProvider } from "@mui/material";

interface ThemeProp {
    children: ReactNode
}

export enum themePalette {
    blue = '#22577a',
    dark = '#212121',
    light = '#ffffff'
}

export const theme = createTheme({
    palette: {
        primary: {
            main: themePalette.blue,
        },
        secondary: {
            main: themePalette.dark
        },
        info: {
            main: themePalette.light
        },
        action: {
            disabledBackground: '',
            disabled: '',
        },
    },
    components: {
        MuiButtonBase: {
            styleOverrides: {
              root: {
                [`&.${buttonClasses.disabled}`]: {
                  opacity: 0.5
                },
              }
            }
        },
        MuiMenu: {
            styleOverrides: {
                root: {
                    maxHeight: '50vh'
                }
            }
        }
    },
    typography: {
        button: {
          textTransform: 'none'
        }
      }
})

export const ThemeConfig = ({ children }: ThemeProp) => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
)