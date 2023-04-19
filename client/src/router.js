import React from "react";

import Home from "./components/main/Home";
import SignIn from "./components/main/SignIn";
import Register from "./components/main/Register";

import Edit from "./components/dashboard/Edit";
import CreateForm from "./components/dashboard/CreateForm";

import { Routes, Route } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="/create" element={<CreateForm />} />
                <Route path="/edit/:id" element={<Edit />} />
            </Route>
        </Routes>
    );
};

export default Router;
