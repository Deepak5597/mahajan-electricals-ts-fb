import { createContext, FC } from "react";

import IConfigContext from "../models/config.context";
import appConfig from '../config/app.config';

export const ConfigContext = createContext<IConfigContext>(appConfig);

export const ConfigContextProvider: FC = ({ children }) => {
    return (
        <ConfigContext.Provider value={appConfig}>
            {children}
        </ConfigContext.Provider>
    )
}