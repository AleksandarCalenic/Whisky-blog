import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { NavLink } from 'react-router-dom';
import StoreContext from '../../store/store-context';

import classes from './NavBar.module.css';

const NavBar = () => {

    const history = useHistory();
    const context = useContext(StoreContext);

    const isLogin = context.isLogin;

    const logoutHandler = () => {
        context.logout();
        history.push('/login');
    };

    return ( 
        <section>
            <nav className={classes.nav}>
                <ul className={classes.nav__list}>
                    <li className={classes.nav__item} activeClass>
                        <NavLink to='/home' className={classes.nav__link} activeClassName={classes.nav__active}>Home</NavLink>
                    </li>
                    {isLogin && <li className={classes.nav__item}>
                        <NavLink to='/whiskies' className={classes.nav__link} activeClassName={classes.nav__active}>Whiskies</NavLink>
                    </li>}
                    <li className={classes.nav__item}>
                        {!isLogin && <NavLink to='/login' className={classes.nav__link} activeClassName={classes.nav__active}>Login</NavLink>}
                        {isLogin && <button onClick={logoutHandler} className={classes.nav__logout} type='button'>Logout</button>}
                    </li>
                </ul>
            </nav>
        </section>
     );
}
 
export default NavBar;
