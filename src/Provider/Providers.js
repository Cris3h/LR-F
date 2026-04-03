"use client";
import {  useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { GlobalContext } from '@/AppContext/AppContext';
import { fetchMainObj } from "@/utils/fetchs";



export const GlobalContextProvider = ({ children }) => {
    const [artWork, setArtWork] = useState();
    const [errorState, setErrorState] = useState(false);
    

    useEffect(()=>{
        const fetchData = async () => {
              const data = await fetchMainObj();
              const [error, ...objs] = data;
              error ? setErrorState(true) : setArtWork(objs)
          };
          fetchData();
    }, []);
   return(
        <SessionProvider>
        <GlobalContext.Provider value={{artWork, errorState}} >
            {children}
        </GlobalContext.Provider>
        </SessionProvider>
    )
};
