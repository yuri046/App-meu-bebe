import { createContext, useContext, useState, useEffect } from 'react';
import { Alert, Grid, Snackbar } from './components';
import { useTranslation } from 'react-i18next';
import { createClient } from '@supabase/supabase-js';


import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import dayjs from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

const AppContext = createContext(null);

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const AppProvider = ({ children }) => {
    const { t: translate, i18n } = useTranslation();
    const timeoutDuration = 6000;
    
    const [snackOpen, setSnackOpen] = useState(false);
    const [snackMessage, setSnackMessage] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertSeverity, setAlertSeverity] = useState("");
    const [alertVariant, setAlertVariant] = useState(null);

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
    };

    const showSnackMessage = (message) => {
        setSnackMessage(message);
        setSnackOpen(true);
    };

    const showAlertMessage = (message, severity, variant) => {
        setAlertMessage(message);
        setAlertSeverity(severity);
        setAlertVariant(variant);

        setTimeout(() => {
            setAlertMessage("");
        }, timeoutDuration);
    };

    const handleClose = () => {
        setSnackMessage("");
        setSnackOpen(false);
    };

    const signOut = async () => {
        await supabase.auth.signOut();
        localStorage.removeItem("session"); 
        showSnackMessage("Você foi desconectado com sucesso.");
    };

    const sharedState = {
        changeLanguage,
        showSnackMessage,
        showAlertMessage,
        translate,
        supabase,
        signOut 
    };

    useEffect(() => {
        const storedLanguage = localStorage.getItem("language") || navigator.language.split("-")[0];
        changeLanguage(storedLanguage);
    }, []);

    return (
        <div className="app-background">
            <AppContext.Provider value={sharedState}>
                {children}
                <Snackbar
                    autoHideDuration={timeoutDuration}
                    onClose={handleClose}
                    open={snackOpen}
                    message={snackMessage}
                />
                {alertMessage && (
                    <Grid container={true} sx={{ position: 'absolute', left: 0, bottom: 0, width: '100%', padding: 2 }}>
                        <Grid item={true} size={{ xs: 12 }}>
                            <Alert variant={alertVariant} severity={alertSeverity}>
                                {alertMessage}
                            </Alert>
                        </Grid>
                    </Grid>
                )}
            </AppContext.Provider>
        </div>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === null) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};

export default AppProvider;