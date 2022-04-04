import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function useGlobal() {
    return useContext(GlobalContext);
}