import { Link } from "react-router-dom";

import Card from '../Card/Card';

import classes from './Whisky.module.css';
import { FaStar } from 'react-icons/fa';

const Whisky = ({ name, photo, rating, id } ) => {
     
    const stars = Array(5).fill(0);

    const starList = stars.map((_, i) => {
        return <FaStar key={i} className={'' + rating > i ? classes['detail-container__active-star'] : ''} />
    });

    return (
        <Card className={classes.card}>
            <Link to={`/whiskies/${id}`}>
                <h2 className={classes.whisky__title}>{name}</h2>
                <div className={classes.whisky__imgContainer}>
                    <img className={classes.whisky__img} src={photo} alt="Whisky" />
                </div>
                <div className={classes['whisky__rating-container']}>
                    <p className={classes.whisky__rating}>Rating: </p>
                    {starList}
                </div>
            </Link>
        </Card>
     );
}
 
export default Whisky;