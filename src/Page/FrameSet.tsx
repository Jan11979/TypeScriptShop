import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import {Route, Routes} from "react-router-dom";
import DrawMenu from "./NavMenu";

import './FrameSet.scss';
import ShoppingListBasicBox from "./ShopListBasic";

export interface IShopListItem {
    name: string;
    count: number;
}

export interface IPersonalShopList {
    id: number;
    name: string;
    list: IShopListItem[];
}

export interface IShopList {
    id: number;
    name: string;
//    list:   IShopListItem[];
    listP: IPersonalShopList[];
}

function CreateData(storageKey: string): IShopList {
    const listeItem: IShopListItem[] = [
        {name: "Milch", count: 2},
        {name: "Butter", count: 1},
        {name: "Bier", count: 6}
    ];
    const listeItem2: IShopListItem[] = [
        {name: "Milch2", count: 1},
        {name: "Butter2", count: 1},
        {name: "Bier2", count: 1}
    ];
    const listePerson: IPersonalShopList[] = [
        {name: "Jan", id: 1, list: listeItem},
        {name: "Peter", id: 2, list: listeItem2}
    ];
    let tmpAllData: IShopList = {id: -1, name: "JanX", /*list: listeItem,*/ listP: listePerson};
    let stringAllData = JSON.stringify(tmpAllData);
    let tmpDataString = localStorage.getItem(storageKey) || stringAllData;
    // Storage Löschen
    tmpDataString = stringAllData;
    tmpAllData = JSON.parse(tmpDataString);

    return tmpAllData;
}

function DrawFrameSet() {
    const STORAGE_KEY = 'MeinWirklichTollerKey123456789';
    const [listeAllData, setListe] = useState(CreateData(STORAGE_KEY));
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listeAllData));
        console.log("useEffect->StoreContent:", listeAllData.name);
    }, [listeAllData]);

    if (listeAllData.id === -1) {
        listeAllData.id = 1;
        listeAllData.name = "Jan";
        let newAllData = {...listeAllData};
        setListe(newAllData);
    }
let test = "";
    return (
        <div>
            <div>
                <header className="Header">
                    <div>
                        <Routes>
                            <Route path="/" element={<Typography variant="h3">Home</Typography>}/>
                            <Route path="/Edit" element={<Typography variant="h3">Edit</Typography>}/>
                            <Route path="/About" element={<Typography variant="h3">About</Typography>}/>
                        </Routes>
                        < DrawMenu/>
                    </div>
                </header>
            </div>
            <div className="Body">
                <div className="LeftBody">
                    <Typography variant="h3">Left</Typography>
                </div>
                <div className="MidBody">
                    <Routes>

                            <Route path="/" element={< ShoppingListBasicBox list={listeAllData}/>} />

                        <Route path="/Edit" element={<Typography variant="h3">Mitte</Typography>}/>
                        <Route path="/About" element={<Typography variant="h3">Mitte</Typography>}/>
                    </Routes>
                </div>
                <div className="RightBody">
                    <Typography variant="h3">Right</Typography>
                    <Routes>
                        <Route  path="/" element={<Typography variant="h3">{test}</Typography>}/>
                        <Route key={test} path="/Edit" element={<Typography variant="h3">{test}</Typography>}/>
                        <Route path="/About" element={<Typography variant="h3">About</Typography>}/>
                    </Routes>
                </div>
            </div>
            <div className="BottomBody">
                <Typography variant="h4">Ende</Typography>
            </div>
        </div>
    )
}

export default DrawFrameSet;