import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
import { data } from "react-router-dom";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    // 1. Initialise with raw null instead of a string "undefined"
    const [session, setSession] = useState(null); 

    // Sign up function
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        
        if (error) {
            console.error("There was an error signing up:", error);
            return { success: false, error };
        }
        return { success: true, data };
    };
    
    // Auth Listener
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
        });

        // The unsubscribe function returned here keeps your app memory clean
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signInUser = async (email, password) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });
            if (error) {
                console.error("Sign in error has occurred: ", error);
                return { success: false, error: error.message };
            }
            console.log("Sign in success", data);
            return { success: true, data };
            
        } catch (error) {
            console.error("An error has occurred: ", error);
            return { success: false, error: error.message };
        }
    };

    const signOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("There was an error signing out: ", error);
        }
    };

    return (
        <AuthContext.Provider value={{ session, signUpNewUser, signInUser, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const UserAuth = () => {
    return useContext(AuthContext);
};