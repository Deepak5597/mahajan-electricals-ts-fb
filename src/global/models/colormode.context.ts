export enum ColorMode {
    dark = "dark",
    light = "light"
}

export default interface IColorModeContext {
    toggleColorMode?: Function,
    mode: ColorMode
}