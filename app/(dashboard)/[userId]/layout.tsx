import Navbar from "@/components/commons/Navbar";

export default function RootLayout( { children} : { children: React.ReactNode}){
    return(
        <>  
            <Navbar/>
            {children}
        </>
    )
};
