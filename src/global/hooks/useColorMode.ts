import { useContext } from "react";
import { ColorModeContext } from "../contexts/ColorModeContext";

export default function useColorMode() {
    return useContext(ColorModeContext);
}