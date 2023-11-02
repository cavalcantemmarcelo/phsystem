import Image from "next/image";
import React from "react";

function Footer({data}){
    return(
        <footer className="mx-auto items-center lg:justify-between py-16 lg:px-40 ">
            <p className="text-center ">
                { data?.disclaimer ? data.disclaimer : " "}
            </p>
            <div className="production mt-10 text-center justify-between">
                <Image
                    src={ data?.logo ? data.logo : "/images/logo_wayz4.svg" }
                    alt={ data?.title ? data.title : "Wayz4" }
                    width={ data?.width ? data.width : 150 }
                    height={ data?.height ? data.height : 100}
                    className="w-40 text-center relative inline mb-10" 
                />
                <p>&copy; { data?.copyright ?  data.copyright : "Ways4." }</p>
            </div>
        </footer>
    );
}

export default Footer;