import { useState, useContext } from 'react';

import Whisky from '../WhiskyList/Whisky';
import StoreContext from '../../store/store-context';

import classes from '../../style/Whiskies.module.css';
import Loading from '../UI/Loading';
import SearchForm from '../Form/SearchForm';

const Whiskies = () => {
    
    const whiskyContext = useContext(StoreContext);
    const [showWhisky, setShowWhisky] = useState(4);
    const [param, setParam] = useState('0');

    let whiskyList, numberOfList, showBtn;

    if(param !== '0') {
        whiskyList = whiskyContext.whisky.filter(whisky => whisky.rating === param).slice(0, showWhisky);
        numberOfList = whiskyContext.whisky.filter(whisky => whisky.rating === param).length;
        showBtn = showWhisky < numberOfList;
    }

    if (param === '0') {
        whiskyList = whiskyContext.whisky.slice(0, showWhisky);
        showBtn = showWhisky < whiskyContext.whisky.length;
    }
    
    const ratingHandler = (value) => {
        setShowWhisky(4);
        setParam(value);
    };
   
    const showMoreHandler = () => {
        setShowWhisky(prev => prev + 3);
    };

    return (
        <section className={classes.whiskies}>
            {whiskyContext.showError && <div>
                <h2 className={classes.error}>{whiskyContext.error}</h2>
            </div>}
            {(whiskyContext.isLoading && !whiskyContext.showError) && <Loading />}
            {(!whiskyContext.isLoading && !whiskyContext.showError) && (
                <div>
                    <SearchForm onRatingHandler={ratingHandler} />
                    {(!numberOfList && param !== '0') && <h2 className={classes.nothingFound}>No Whisky Found</h2>}
                    {(numberOfList || param === '0') && (
                        <div>
                            <div className={classes.whiskies__container}>
                                {whiskyList.map(whisky => <Whisky key={whisky.id} name={whisky.name} photo={whisky.photo} rating={whisky.rating} id={whisky.id} />)}
                            </div>
                            <div>
                                {showBtn && <button onClick={showMoreHandler} className={classes.btn} type='button'>Load more</button>}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </section>
     );
}
 
export default Whiskies;