// import { useState } from 'react';

// import { useParams } from 'react-router-dom';

import classes from './Comment.module.scss';
// import { AiFillLike, AiFillDislike } from 'react-icons/ai';
// import { useContext } from 'react';
// import StoreContext from '../../store/store-context';

const Comment = ({ name, date, text, country, id }) => {

    // const [like, setLike] = useState(null);
    // const [dislike, setDislike] = useState(null);
    // const params = useParams();
    // const context = useContext(StoreContext);

    // const likeClass = `${classes['likes-dislikes__btn-like']} ${like ? classes['btn-active'] : ''}`;
    // const dislikeClass = `${classes['likes-dislikes__btn-dislike']} ${dislike ? classes['btn-dislikes'] : ''}`;

    // const user = context.token;

    // const likeDislike = (likesDislikes, setLikeDislike) => {

    //     setLikeDislike(true);

    //     const fetchLikeDislike = async() => {

    //         try {

    //             await fetch(`https://vezba-ec7fa-default-rtdb.europe-west1.firebasedatabase.app/whiskies/${params.whiskyId}/comments/${id}/${likesDislikes}.json`, {
    //                 method: 'POST',
    //                 body: JSON.stringify({
    //                     user
    //                 }),
    //                 headers: { 'Content-Type': 'application/json' },
    //             });
   
    //         } catch {
                
    //         }
    //     };

    //     fetchLikeDislike();
    // }

    // const likeHandler = () => {
    //     likeDislike('likes' , setLike);
    // };

    // const dislikeHandler = () => {
    //     likeDislike('dislikes' , setDislike);
    // };

    return ( 
        <tr className={classes.row}>
            <td className={classes.data}>{name}</td>
            <td className={classes.data}>{country}</td>
            <td className={classes.data}>{date}</td>
            <td className={classes.data}>
                <p className={classes.text}>{text}</p>
                {/* <div className={classes['likes-dislikes']}>
                    <button onClick={likeHandler} type='button' className={classes['likes-dislikes__like']}>
                        <AiFillLike className={likeClass} />
                    </button>
                    <span>{}</span>
                    <button onClick={dislikeHandler} type='button' className={classes['likes-dislikes__like']}>
                        <AiFillDislike className={dislikeClass} />
                    </button>
                    <span>{}</span>
                </div> */}
            </td>
        </tr>
     );
}
 
export default Comment;