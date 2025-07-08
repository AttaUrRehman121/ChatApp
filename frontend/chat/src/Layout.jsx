// src/components/Layout.jsx
import React from 'react';
import Header from './Header.jsx';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-fill container py-4">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
