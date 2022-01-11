import './NavMenu.scss';
//import {Link} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import HomeWorkIcon from '@mui/icons-material/HomeWork';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';


function DrawMenu() {

    const [value, setValue] = React.useState(0);
    let navigate = useNavigate();
    return (
                <Box sx={{width: 600}}>
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
                                    let navString="list="+1+"&id="+2;
                                    //let navString="/Edit?list="+listID+"?id="+myID;
                                    //navigate(navString, {replace: true});
                                    navigate({
                                        pathname: '/',
                                        search: navString,
                                    });

//                                    navigate("/", {replace: true});
                                }
                                    break;
                                case 1:
                                    navigate("/Edit", {replace: true});

                                    break;
                                case 2:
                                    navigate("/About", {replace: true});
                                
                                    break;
                            }
                        }}
                    >
                        <BottomNavigationAction label="Home" icon={<HomeWorkIcon/>}/>
                        <BottomNavigationAction label="Edit" icon={<ContentPasteIcon/>}/>
                        <BottomNavigationAction label="About" icon={<ManageAccountsIcon/>}/>
                    </BottomNavigation>
                </Box>

    )
}

export default DrawMenu;
