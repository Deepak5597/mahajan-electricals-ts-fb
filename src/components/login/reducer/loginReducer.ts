const loginReducer = (state: any, action: any) => {
    switch (action) {
        case "INITIATE":
            return { ...state, isLoading: true, isSuccess: true, message: '' };
        case "SUCCESS":
            return { ...state, isLoading: false, isSuccess: true, message: "Logged in Successfully" }
        case "FAILURE_ERROR":
            return { ...state, isLoading: false, isSuccess: false, message: "Either Email or Password is wrong" }
        case "FAILURE_EXCEPTION":
            return { ...state, isLoading: false, isSuccess: false, message: "Something went wrong at our end !!!" }
        case "FAILURE_VALIDATION":
            return { ...state, isLoading: false, isSuccess: false, message: "Either email or password field is empty" }
        default:
            return state;
    }
}

export default loginReducer;
