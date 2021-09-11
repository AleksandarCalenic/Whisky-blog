import { useState, useEffect } from 'react';

import { FaStar } from 'react-icons/fa';
import classes from './StarRating.module.css';

const StarRating = ({ detailAboutWhisky }) => {

    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

    useEffect(() => {
        
        setRating(detailAboutWhisky.rating);

    }, [detailAboutWhisky.rating])

    return ( 
        <div className={classes.star__container}>
            {[...Array(5)].map((star, i) => {
                let value = i + 1;
                return (
                    <label key={i} className={classes.star}>
                        <input 
                        onClick={ () => setRating(value) } 
                        type="radio" 
                        className={classes.star__input} 
                        value={value}         
                        />
                        <FaStar 
                        className={value <= (hover || rating) ? classes.star__active : ''} 
                        onMouseEnter={ () => setHover(value)}
                        onMouseLeave={ () => setHover(null)}    
                        />
                    </label>
                )
            })}
        </div>
     );
}
 
export default StarRating;