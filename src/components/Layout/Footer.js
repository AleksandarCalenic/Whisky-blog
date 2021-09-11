import classes from './Footer.module.css';
import { FaInstagram } from 'react-icons/fa';


const Footer = () => {
    return ( 
        <section className={classes.footer}>
            <div className={classes.footer__upper}>
                <span className={classes.footer__span}>Follow us on:</span>
                <a className={classes.footer__link} href="https://www.instagram.com/all_about_whisky/?hl=en" target="_blank" rel="noreferrer">
                    <FaInstagram className={classes.footer__instgram} />
                </a>
            </div>
            <div>
                <p className={classes.footer__copy}>&#169; Copyright All_about_whisky</p>
            </div>
        </section>
     );
}
 
export default Footer;