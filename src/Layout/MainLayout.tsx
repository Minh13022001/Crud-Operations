import React from "react";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import './index.scss'

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className="main-layout">
      <Sidebar />
      <div>
        <Header />
        {children}
        
      </div>
    </div>
  );
}

export default MainLayout;
