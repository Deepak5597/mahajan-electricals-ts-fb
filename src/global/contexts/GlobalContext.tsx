import { createContext, FC, useEffect, useState } from "react";

import { collection, onSnapshot, query } from "firebase/firestore";

import IGlobalContext from "../models/global.context";
import dropdownConfig from "../config/dropdown.config";
import IParty from "../../components/party/model/party";
import db from "../../firebase";
import mapper from "../utility/dbobject.mapper";
import config from "../config/app.config";
import partiesDummyData from "../../data/parties.data";

const initialValue: IGlobalContext = { parties: [], items: [], companies: [], dropdownConfig };

export const GlobalContext = createContext(initialValue);

export const GlobalContextProvider: FC = ({ children }) => {
    const [parties, setParties] = useState<Array<IParty>>(() => {
        return [];
    })
    useEffect(() => {
        if (process.env.REACT_APP_ENV === "dev") {
            setParties(partiesDummyData);
            console.log("Current parties in Global Context Dev : ", partiesDummyData);
        } else {
            const partyQuery = query(collection(db, config.partyDb));
            const partyUnsubscriber = onSnapshot(partyQuery, (querySnapshot) => {
                const partiesArr: Array<IParty> = [];
                querySnapshot.forEach((doc) => {
                    partiesArr.push(mapper.createPartyObject(doc.data(), doc.id));
                });
                console.log("Current parties in Global Context Prod : ", partiesArr);
                setParties(partiesArr);
            })
            return partyUnsubscriber;
        }
    }, [])
    return (
        <GlobalContext.Provider value={{ parties, setParties, items: [], companies: [], dropdownConfig }}>
            {children}
        </GlobalContext.Provider>
    )
}
