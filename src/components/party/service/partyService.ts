import config from '../../../global/config/app.config';
import db from '../../../firebase';
import { collection, addDoc } from "firebase/firestore";
import IParty from '../model/party';

const createParty = async (payload: IParty, callback: Function) => {
    try {
        const docRef = await addDoc(collection(db, config.partyDb), payload);
        callback(docRef.id, null);
    } catch (err) {
        callback(null, err);
    }
}

const updateParty = async (payload: IParty) => {

}

const partyService = { createParty, updateParty }
export default partyService