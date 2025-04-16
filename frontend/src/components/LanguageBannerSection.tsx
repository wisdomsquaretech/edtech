import React from "react";

const LanguageBannerSection = () =>{
    return(
        <div>
            <div className="bg-blue-100 py-2 text-center text-blue-800 text-sm">
                <span>Available in: </span>
                <button className="font-medium mx-1 cursor-pointer">English</button>
                <span>|</span>
                <button className="mx-1 cursor-pointer">Español</button>
                <span>|</span>
                <button className="mx-1 cursor-pointer">한국어</button>
            </div>
        </div>
    );
};

export default LanguageBannerSection;