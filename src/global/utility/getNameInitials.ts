export default function getNameInitials(inputString: string) {
    if (inputString) {
        return inputString.split(" ").reduce((previousValue, currentValue) => { return previousValue + currentValue.substring(0, 1) }, '');
    } else {
        return ''
    }
}