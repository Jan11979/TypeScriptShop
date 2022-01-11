import {Typography} from "@mui/material";
import React, {useEffect, useState} from "react";

import {Route, Routes} from "react-router-dom";
import DrawMenu from "./NavMenu";

import './FrameSet.scss';
import ShoppingListBasicBox from "./ShopListBasic";
import BasicEditBox from "./BasicEditBox";

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
        {name: "Jan", id: 0, list: listeItem},
        {name: "Peter", id: 1, list: listeItem2}
    ];
    let tmpAllData: IShopList = {id: -1, name: "JanX", /*list: listeItem,*/ listP: listePerson};
    let stringAllData = JSON.stringify(tmpAllData);
    let tmpDataString = localStorage.getItem(storageKey) || stringAllData;
    // Storage Löschen
    tmpDataString = stringAllData;
    tmpAllData = JSON.parse(tmpDataString);

    return tmpAllData;
}
//https://jpshoplist.herokuapp.com/sl/miau
async function getAll(src: string) {
    const response = await fetch(src);
    /*    if (response.status != 200) {
            alert("Achtung!!!\nStatus ist nicht 200!");
            return 0;
        }*/
    const body = await response.text();//json();
    const result = body;
    console.log("Vom Server Miau :", result);
    return result;
}

function DrawFrameSet() {
    const STORAGE_KEY = '234234234234MeinWirklichTollerKey123456789';
    const [listeAllData, setListe] = useState(CreateData(STORAGE_KEY));
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(listeAllData));
        console.log("useEffect->StoreContent:", listeAllData.name);
    }, [listeAllData]);

    if (listeAllData.id === -1) {
        listeAllData.id = 0;
        listeAllData.name = "Jan";
        let newAllData = {...listeAllData};
        setListe(newAllData);
    }

    ////https://jpshoplist.herokuapp.com/sl/miau
    //"https://rickandmortyapi.com/api/character/?name=rick&status=alive")
    const [data, setData] = useState([]);
//    useEffect(() => {
        getAll("https://jpshoplist.herokuapp.com/sl/miau");
        //    .then(data => console.log("Miau vom Server",data))
        //    }, [])


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
                    <Routes>
                        <Route  path="/" element={<BasicEditBox  listData={listeAllData} setterListe={setListe} />}/>
                        <Route  path="/Edit" element={<BasicEditBox  listData={listeAllData} setterListe={setListe} />}/>
                        <Route path="/About" element={<BasicEditBox  listData={listeAllData} setterListe={setListe} />}/>
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