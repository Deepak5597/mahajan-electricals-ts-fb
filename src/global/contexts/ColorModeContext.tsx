import { createContext, FC, useMemo, useState } from "react";
import { ColorMode } from "../models/colormode.context";
import IColorModeContext from "../models/colormode.context";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const defaultThemeColor: IColorModeContext = { mode: ColorMode.light }

export const ColorModeContext = createContext(defaultThemeColor);

export const ColorModeContextProvider: FC = ({ children }) => {
    const [mode, setMode] = useState<ColorMode>(ColorMode.light);

    const theme = useMemo(
        () => createTheme({
            typography: {
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
            },
            palette: {
                mode,
            },
        }),
        [mode],
    );
    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === ColorMode.light ? ColorMode.dark : ColorMode.light));
    }

    return (
        <ColorModeContext.Provider value={{ toggleColorMode, mode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    )
}
