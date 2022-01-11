import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import React from "react";
import IconButton from '@mui/material/IconButton';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import {IShopList, IShopListItem} from "./FrameSet";
import TextField from '@mui/material/TextField';





interface PropsDrawIconButton {
    icon: JSX.Element,
    text: string,
    disabled?: boolean
}

//<IconButton aria-label={text}>
function DrawIconButton({icon, text, disabled}: PropsDrawIconButton) {
    if (disabled) {
        return (<IconButton disabled aria-label={text} > {icon} </IconButton>)
    } else {
        return (<IconButton aria-label={text} > {icon} </IconButton>)
    }
}


interface PropsBasicEditBox {
    listData: IShopList,
    setterListe: Function,
}

function BasicEditBox({listData, setterListe}: PropsBasicEditBox) {
    let navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const paramListString = searchParams.get('list')
    const paramIDString = searchParams.get('id')
    const paramStatus = searchParams.get('statleft')

    if(paramListString === null)
        return ( <div></div>)
    if(paramIDString === null)
        return ( <div></div>)

    let paramListID = parseInt(paramListString);
    let paramID = parseInt(paramIDString);


    const handleBasicEditBoxPrioUp: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxPrioUp");
        let tmpItem:IShopListItem = listData.listP[paramListID].list[paramID-1];
        listData.listP[paramListID].list[paramID-1] = listData.listP[paramListID].list[paramID];
        listData.listP[paramListID].list[paramID] = tmpItem;
        paramID = paramID-1;
        setterListe({...listData});
        let navString="statleft=edit&list="+paramListID+"&id="+paramID;
        navigate({ pathname: location.pathname, search: navString, });
    }
    const handleBasicEditBoxPrioDown: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxPrioDown");
        let tmpItem:IShopListItem = listData.listP[paramListID].list[paramID+1];
        listData.listP[paramListID].list[paramID+1] = listData.listP[paramListID].list[paramID];
        listData.listP[paramListID].list[paramID] = tmpItem;
        paramID = paramID+1;
        setterListe({...listData});
        let navString="statleft=edit&list="+paramListID+"&id="+paramID;
        navigate({ pathname: location.pathname, search: navString, });
    }

    const handleBasicEditBoxAddCount: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxAddCount");
        listData.listP[paramListID].list[paramID].count += 1;
        setterListe({...listData});
    }
    const handleBasicEditBoxSubCount: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxSubCount");
        listData.listP[paramListID].list[paramID].count -= 1;
        setterListe({...listData});
    }
    const handleBasicEditBoxExit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxExit");
        let navString="";
        navigate({ pathname: location.pathname, search: navString, });
    }
    const handleBasicEditBoxKill: React.MouseEventHandler<HTMLButtonElement> = (event) => {
        console.log("handleBasicEditBoxKill");
        const index = listData.listP[paramListID].list.indexOf(listData.listP[paramListID].list[paramID], 0);
        if (index > -1) {
            listData.listP[paramListID].list.splice(index, 1);
        }
        setterListe({...listData});
        let navString="";
        navigate({ pathname: location.pathname, search: navString, });
    }






    function DrawPrioUpButton({icon, text }: PropsDrawIconButton) {

        if( paramID <= 0 ){
            return (<IconButton disabled aria-label={text} > {icon} </IconButton>)
        } else {
            return (<IconButton aria-label={text} onClick={handleBasicEditBoxPrioUp}> {icon} </IconButton>)
        }
    }
    function DrawPrioDownButton({icon, text }: PropsDrawIconButton) {
        if( paramID >= (listData.listP[paramListID].list.length-1) ){
            return (<IconButton disabled aria-label={text} > {icon} </IconButton>)
        } else {
            return (<IconButton aria-label={text} onClick={handleBasicEditBoxPrioDown} > {icon} </IconButton>)
        }
    }
    function DrawAddCountButton({icon, text }: PropsDrawIconButton) {
        if( listData.listP[paramListID].list[paramID].count >= 99 ){
            return (<IconButton disabled aria-label={text} > {icon} </IconButton>)
        } else {
            return (<IconButton aria-label={text} onClick={handleBasicEditBoxAddCount} > {icon} </IconButton>)
        }
    }
    function DrawSubCountButton({icon, text }: PropsDrawIconButton) {
        if( listData.listP[paramListID].list[paramID].count <= 1 ){
            return (<IconButton disabled aria-label={text} > {icon} </IconButton>)
        } else {
            return (<IconButton aria-label={text} onClick={handleBasicEditBoxSubCount} > {icon} </IconButton>)
        }
    }
    function DrawExitButton({icon, text }: PropsDrawIconButton) {
            return (<IconButton aria-label={text} onClick={handleBasicEditBoxExit} > {icon} </IconButton>)
    }
    function DrawKillButton({icon, text }: PropsDrawIconButton) {
        return (<IconButton aria-label={text} onClick={handleBasicEditBoxKill} > {icon} </IconButton>)
    } 


    /**
     * <IconButton color="secondary" aria-label="Hallo">
     * color="primary"
     * color="success"
     * size="large"
     * size="small"
     */
    if (paramStatus === "edit") {
        return (
            <div>

                <p> Liste: {paramListString}  </p>
                <p> ID: {paramIDString}  </p>
                <div className="ShopListElementButtonsRight">

                    <TextField value={listData.listP[paramListID].list[paramID].name} id="standard-basic" label="Artikel" variant="standard" />

                    <DrawPrioUpButton  icon={<KeyboardArrowUpIcon/>} text="Prio Up" />
                    <DrawPrioDownButton  icon={<KeyboardArrowDownIcon/>} text="Prio Down" />

                    <DrawAddCountButton  icon={<AddCircleOutlineIcon/>} text="Count Up" />
                    <DrawSubCountButton  icon={<RemoveCircleOutlineIcon/>} text="Count Down" />

                    <DrawKillButton  icon={<DeleteIcon/>} text="Kill" />
                    <DrawExitButton  icon={<CloseIcon/>} text="Exit" />

                </div>
            </div>
        )
    } else {
        return (<div></div>)
    }
}
/*
<Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="filled-basic" label="Filled" variant="filled" />
      <TextField id="standard-basic" label="Standard" variant="standard" />
    </Box>
 */

export default BasicEditBox
