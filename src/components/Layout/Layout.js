import { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar"

const Layout = ({ children }) => {
    return ( 
        <Fragment>
            <Header />
            <NavBar />
            {children}
            <Footer />
        </Fragment>
     );
}
 
export default Layout;