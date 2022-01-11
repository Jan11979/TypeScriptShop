import * as React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import DrawFrameSet from "./Page/FrameSet";


//const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
//    const colorMode = React.useContext(ColorModeContext);
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light',
                },
            }),
        [prefersDarkMode],
    );


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <DrawFrameSet />
        </ThemeProvider>
    );
}
//{theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
/*
function App() {
    const [mode, setMode] = React.useState<'light' | 'dark'>('light');
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );
    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );
    const [value, setValue] = React.useState(0);
    // let navigate = useNavigate();
  return (

    <div >
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            {theme.palette.mode} mode
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Typography variant="h1" >Miau1Miau</Typography>
            <Typography variant="h2" >Miau2Miau</Typography>
            <Box sx={{width: 500}}>


                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                        console.log("BottomNavigation", newValue);
                        event.preventDefault();
                        //await submitForm(event.target);
                        switch (newValue) {
                            case 0: {

                            }
                                break;
                            case 1: {

                            }
                                break;
                            case 2: {

                            }
                                break;

                        }
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<RestoreIcon/>}/>
                    <BottomNavigationAction label="Edit" icon={<FavoriteIcon/>}/>
                    <BottomNavigationAction label="About" icon={<LocationOnIcon/>}/>
                </BottomNavigation>
            </Box>
          <DrawFrameSet />
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
}
*/
export default App;
