import React from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Footer from "./components/Footer";
import Edit from "./components/Edit";
import CreateForm from "./components/CreateForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

const App = () => {
    const [theme, colorMode] = useMode();
    return (
        <React.Fragment>
            <BrowserRouter>
                <NavBar />
                <ColorModeContext.Provider value={colorMode}>
                    <div id="main-content">
                        <Routes>
                            <Route path="/" element={<Main />} />
                            <Route path="/signin" element={<SignIn />} />
                            <Route path="/register" element={<Register />} />
                            <Route element={<ProtectedRoutes />}>
                                <Route
                                    path="/create"
                                    element={<CreateForm />}
                                />
                                <Route path="/edit/:id" element={<Edit />} />
                            </Route>
                        </Routes>
                    </div>
                </ColorModeContext.Provider>
                <Footer />
            </BrowserRouter>
        </React.Fragment>
    );
};

// const NotFound = () => {
//   return <h1> Not found</h1>
// }
export default App;
