import React from "react"
import Header from "../header/Header"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Outlet />
      </div>
    </>
  )
}

export default Layout
