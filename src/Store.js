import { createGlobalState } from "react-hooks-global-state";



const { setGlobalState, useGlobalState } = createGlobalState({
    username: "",
    email: "",
    logged_in: false,
});

export { setGlobalState, useGlobalState };