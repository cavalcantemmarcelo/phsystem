import CustomScripts from "@/scripts/CustomScripts";
import React from "react";

function BackToTopButton(props) { 
    return (
        <>
            <button
                id="backToTopBtn"
                className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md flex items-center gap-2">
                <i className="fas fa-arrow-up"></i>
                <span className="hidden md:inline"></span>
            </button>
            <CustomScripts />
        </>
    );
 }

 export default BackToTopButton;