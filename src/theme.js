import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//Color design tokens
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#66a639",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#e9e7e3",
                500: "#e3e1de",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            greenAccent: {
                100: "#e55c9c",
                200: "#e55c9c",
                300: "#e55c9c",
                400: "#e55c9c",
                500: "#e55c9c",
                600: "#e55c9c",
                700: "#e55c9c",
                800: "#e55c9c",
                900: "#e55c9c"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blueAccent: {
                100: "#a9a8a6",
                200: "#a9a8a6",
                300: "#a9a8a6",
                400: "#a9a8a6",
                500: "#a9a8a6",
                600: "#a9a8a6",
                700: "#a9a8a6",
                800: "#a9a8a6",
                900: "#a9a8a6"
            }, 
        } : {
            grey: {
            100: "#141414",
            200: "#292929",
            300: "#3d3d3d",
            400: "#525252",
            500: "#666666",
            600: "#858585",
            700: "#a3a3a3",
            800: "#c2c2c2",
            900: "#e0e0e0",
        },
        primary: {
            100: "#040509",
            200: "#080b12",
            300: "#0c101b",
            400: "#f2f0f0",
            500: "#141b2d",
            600: "#434957",
            700: "#727681",
            800: "#a1a4ab",
            900: "#d0d1d5",
        },
        greenAccent: {
            100: "#0f2922",
            200: "#1e5245",
            300: "#2e7c67",
            400: "#3da58a",
            500: "#4cceac",
            600: "#70d8bd",
            700: "#94e2cd",
            800: "#b7ebde",
            900: "#dbf5ee",
        },
        redAccent: {
            100: "#2c100f",
            200: "#58201e",
            300: "#832f2c",
            400: "#af3f3b",
            500: "#db4f4a",
            600: "#e2726e",
            700: "#e99592",
            800: "#f1b9b7",
            900: "#f8dcdb",
        },
        blueAccent: {
            100: "#151632",
            200: "#2a2d64",
            300: "#3e4396",
            400: "#535ac8",
            500: "#6870fa",
            600: "#868dfb",
            700: "#a4a9fc",
            800: "#c3c6fd",
            900: "#e1e2fe",
        }}),
});


//MUI theme settings
export const themeSettings = (mode) => {
    const colours = tokens(mode);

    return {
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    primary: {
                        main: colours.primary[500],
                    },
                    secondary: {
                        main: colours.greenAccent[500]
                    },
                    neutral: {
                        dark: colours.grey[700],
                        main: colours.grey[500],
                        light: colours.grey[100],
                    },
                    background: {
                        default: colours.primary[500]
                    }
                } : {
                    primary: {
                        main: colours.primary[100],
                    },
                    secondary: {
                        main: colours.greenAccent[500]
                    },
                    neutral: {
                        dark: colours.grey[700],
                        main: colours.grey[500],
                        light: colours.grey[100],
                    },
                    background: {
                        default: "fcfcfc",
                    }
                }
            )
        },
        typography: {
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: {
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        }
    };
};

//Conext for colour mode
export const ColorModeContext = createContext({
    toggleColorMode: () => {}
});

export const useMode = () => {
    const [mode, setMode] = useState("dark");
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light")),
        }),
        []
    );
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode])
    
    return [theme, colorMode];
};