import { useState, Fragment, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Comments from '../Comments/Comments';
import Loading from '../UI/Loading';

import StoreContext from '../../store/store-context';

import classes from '../../style/WhiskyDetail.module.css';
import { FaRegComment } from 'react-icons/fa';
import StarRating from '../Comments/StarRating';

const WhiskyDetail = () => {

    const whiskyContext = useContext(StoreContext);
    const history = useHistory();
    const [comments, setComments] = useState(false);
    const params = useParams();

    const detailAboutWhisky = whiskyContext.whisky.find(whisky => whisky.id === params.whiskyId);
    
    if (!detailAboutWhisky) return null;

    const price = Number(detailAboutWhisky.price).toFixed(2);
    
    const currentValue = detailAboutWhisky.rating;

    const commentsList = [];
    
    for (const key in detailAboutWhisky.comments) {
        commentsList.push({
            id: key,
            name: detailAboutWhisky.comments[key].name,
            text: detailAboutWhisky.comments[key].text,
            date: detailAboutWhisky.comments[key].date,
            country: detailAboutWhisky.comments[key].country,
        })
    };

    const showCommentsHandler = () => {
        setComments(!comments);
    };

    const backHandler = () => {
        history.push('/whiskies');
    };

    return ( 
        <Fragment>
            {whiskyContext.isLoading && <Loading className={classes.loading__black} />}
            {!whiskyContext.isLoading && (
                <section>
                    <div className={classes['detail-container']}>
                        <div className={classes['detail-container__img-box']}>
                            <img className={classes['detail-container__img']} src={detailAboutWhisky.photo} alt="Bottle of whisky" />
                        </div>
                        <div className={classes['detail-container__text']}>
                            <h2 className={classes['detail-container__title']}>{detailAboutWhisky.name}</h2>
                            <p className={classes['detail-container__description']}>{detailAboutWhisky.description}</p>
                            <div className={classes['detail-container__price-container']}>
                                <span>Price: </span>
                                <span>{price}$</span>
                            </div>
                            <div className={classes['detail-container__rating']}>
                                <span className={classes['detail-container__rating-value']}>Rating: </span>
                                <StarRating detailAboutWhisky={detailAboutWhisky} />
                            </div>
                            <div className={classes['detail-container__comments']}>
                                <span className={classes['detail-container__span']}>Number of comments</span>
                                <button className={classes['detail-container__comments-btn']} onClick={showCommentsHandler}>
                                    <span className={classes['detail-container__comments-amout']}>{commentsList.length}</span>
                                    <span className={classes['detail-container__comments-icon']}><FaRegComment /></span>
                                </button>
                            </div>
                            <div>
                                <button type='button' className={classes.btn__back} onClick={backHandler}>Back</button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.comments}>
                        {comments && <Comments comments={commentsList} />}
                    </div>
                </section>
            )}
        </Fragment>
     );
}
 
export default WhiskyDetail;