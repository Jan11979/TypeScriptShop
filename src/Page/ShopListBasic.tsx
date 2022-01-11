//import './ShopListe.scss';
import {IPersonalShopList, IShopList} from './FrameSet';
//import ShopListElementText from './EditShopListItemText';
import * as React from 'react';
import {useNavigate, useSearchParams, useLocation} from "react-router-dom";
//import { useSearchParams } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

import EditIcon from '@mui/icons-material/Edit';
//import SettingsIcon from '@mui/icons-material/Settings';
//import CommentIcon from '@mui/icons-material/Comment';

import {Typography} from "@mui/material";

/*
interface ElementProps {
    count: number,
    text: string
}

//< ShopListElementText text={text} count={count} />
function Element({count, text}: ElementProps) {
    return (
        <div className="ShopListElement">
          <p>{count}</p><p> X </p><p>{text}</p>
        </div>
    )
}
*/

/**
 * #Freitag
 */
interface ElementPropsShoppingListBox {
    list: IPersonalShopList
}
/*
function ShoppingListBox( { list } : ElementPropsShoppingListBox) {
    return (
        <div className="ShopListElementAll" >
            <p> {list.name} </p>
            {list.list.map((e, i) => (< Element key={i} count={e.count} text={e.name}/>))}
        </div>
    )
}
*/


interface PropsShoppingListBasicBox {
    list: IShopList
}

//{list.listP.map((e, i) => (< ShoppingListBox key={i} list={e}/>))}
function ShoppingListBasicBox({ list } : PropsShoppingListBasicBox) {
    return (
        <div>
            <p> Listen </p>
            {list.listP.map((e, i) => (< ShoppingListBasicUserList key={i} list={e}/>))}
            ShoppingListBasicUserList
        </div>
    )
}

interface PropsShoppingListBasicListCreateString {
    count:  number,
    text:   string
}
function ShoppingListBasicListCreateString( { count, text } : PropsShoppingListBasicListCreateString) {
    let elementString = "";
    elementString += count.toString();
    elementString += " "
    elementString += text;

    return(
        <div>
            {elementString}
        </div>
    )
}
function ShoppingListBasicUserList( { list } : ElementPropsShoppingListBox) {
    let navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const listParam = searchParams.get('list')
    const idParam = searchParams.get('id')



    console.log("ShoppingListBasicUserList" , listParam, idParam );


    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value: number) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };
    const handleEventEdit = ( listID: number, myID: number) => {
    //const handleEventEdit: React.MouseEventHandler<HTMLButtonElement> = (event: ) => {
        console.log("handleShopListElementEventAdd" , listID, myID);
        let navString="statleft=edit&list="+listID+"&id="+myID;
        navigate({ pathname: location.pathname, search: navString, });

    }

    return (
        <div>
            <Typography variant="h3">{list.name}</Typography>
        <List sx={{ width: '100%', maxWidth: 500, bgcolor: 'background.paper' }}>
            {list.list.map((elem, i) => {
                const labelId = `checkbox-list-label-${i}`;
                return (
                    <ListItem
                        key={i}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments" onClick= {(e) => handleEventEdit( list.id,  i)} >
                                <EditIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(i)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(i) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={<ShoppingListBasicListCreateString count={elem.count} text={elem.name} /> } />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
        </div>
    );
}

export default ShoppingListBasicBox
