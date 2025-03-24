import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from '../login/Login';
import Signup from '../login/Signup';
import Home from '../login/Home'

function Index() {
    return (
        <Router>
            <Routes>
                <Route path="/crud-app/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home/>} />
            </Routes>
        </Router>
    );
}

export default Index;
