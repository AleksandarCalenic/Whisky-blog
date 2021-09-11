import { useRef } from 'react';
import classes from './SearchForm.module.css';

const SearchForm = ({ onRatingHandler }) => {

    const ratingRef = useRef();

    const ratingHandler = () => {
        onRatingHandler(ratingRef.current.value);
    };

    return ( 
        <div className={classes.form__rating}>
            <form className={classes['form__rating-form']}>
                <div className={classes['form__rating-select-rating']}>
                    <label className={classes['form__rating-label']} htmlFor="rating">Rating</label>
                    <select className={classes['form__rating-select']} name="rating" id="rating" onChange={ratingHandler} ref={ratingRef}>
                    <option value="0">all</option>
                    <option value="1">&#11088;</option>
                    <option value="2">&#11088;&#11088;</option>
                    <option value="3">&#11088;&#11088;&#11088;</option>
                    <option value="4">&#11088;&#11088;&#11088;&#11088;</option>
                    <option value="5">&#11088;&#11088;&#11088;&#11088;&#11088;</option>
                    </select>
                </div>
            </form>
        </div>
     );
}
 
export default SearchForm;
