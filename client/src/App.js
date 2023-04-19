import React from "react";

import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";

import { BrowserRouter } from "react-router-dom";

import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

import Router from "./router";

const App = () => {
    const [theme, colorMode] = useMode();
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <ColorModeContext.Provider value={colorMode}>
                <ThemeProvider theme={theme}>
                <CssBaseline />
                    <div id="main-content">
                        <Router />
                    </div>
                    </ThemeProvider>
                </ColorModeContext.Provider>
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
