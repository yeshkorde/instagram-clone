
import "../globals.css";
import "../styles.css";

import SideBar from "../components/SideBar";
import UserContextProvider from "../context/userContext";
import PostContextProvider from "../context/PostCoxtex";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <UserContextProvider>
          <PostContextProvider>
       <div className="h-full w-full flex  ">
       <div class="h-full w-[30%] ">
       <SideBar/>
       </div >
       {children} 
       </div>
          </PostContextProvider>
        </UserContextProvider>
      </body>
    </html>
  );
}
