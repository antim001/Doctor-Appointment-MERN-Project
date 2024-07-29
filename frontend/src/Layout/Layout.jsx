import React from 'react'
import Header from '../components/Header/Header.jsx'
import Footer from '../components/Footer/Footer.jsx';
import Routes from '../router/Routes.jsx'
function Layout() {
  return (
    <>
    <Header></Header>
    <main>
        <Routes></Routes>
    </main>
    <Footer></Footer>
    </>
  )
}

export default Layout
