import React from 'react'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx';
import Routers from '../router/Routers.jsx'
function Layout() {
  return (
    <>
    <Header></Header>
    <main>
        <Routers></Routers>
    </main>
    <Footer></Footer>
    </>
  )
}

export default Layout
