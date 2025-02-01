import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";

import { CreatePost, Home } from "./pages";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <header
                    className="w-full flex justify-between items-center bg-[#313233] sm:px-8 px-4 py-4 border-b 
                border-b-[#222] "
                >
                    <Link>
                        <img
                            src="logo.png"
                            alt="logo"
                            className="w-12 object-contain"
                        />
                    </Link>
                    <Link
                        to="/create-post"
                        className="font-inter text-sm font-medium text-white px-4 py-2 rounded-md bg-violet-600
                         hover:bg-violet-500 "
                    >
                        {" "}
                        Create{" "}
                    </Link>
                </header>
                <main className="sm:p-8 px-4 py-8 w-full bg-gray-950  min-h-[calc(100vh-73px)] ">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/create-post" element={<CreatePost />} />
                    </Routes>
                </main>
            </BrowserRouter>
        </>
    );
};

export default App;
