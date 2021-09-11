import video from '../../assets/Barrels3.mp4';

import classes from './Header.module.css';

const Header = () => {
    return ( 
        <header className={classes.header}>
            <video autoPlay muted loop>
                <source src={video} type="video/mp4" />
            </video>
        </header>
    );
}
 
export default Header;