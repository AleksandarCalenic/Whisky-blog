import classes from '../../style/Home.module.css';
import { FaGlassWhiskey } from 'react-icons/fa';

const Home = () => {
    return ( 
        <section className={classes.home}>
            <h2 className={classes.home__title}>ALL_ABOUT_WHISKY</h2>
            <p className={classes.home__text}>We are very passionate about whiskies, and we want to share this knowledge with you 
            <span className={classes.home__glass}>
                <FaGlassWhiskey /> 
            </span>
            <span className={classes.home__glass}>
                <FaGlassWhiskey /> 
            </span>
            <span className={classes.home__glass}>
                <FaGlassWhiskey /> 
            </span>
            </p>
        </section>
     );
}
 
export default Home;