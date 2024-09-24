import { createContext, useState} from "react";

export const Context = createContext();

const ContextProvider = (props) => {
   
const [openPersonForm,setOpenPersonForm] = useState(false)


    const contextValue = {
        setOpenPersonForm,
        openPersonForm,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
