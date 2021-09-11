import { useState, useEffect } from 'react';

import Comment from './Comment';
import Modal from '../Modal/Modal';

import classes from './Comments.module.css';

const Comments = ({ comments }) => {
    const [addComment, setAddComment] = useState(false);

    const commentsLength = comments.length === 0;

    const showAddCommentFormHandler = () => {
        setAddComment(true);
    };

    const cancelHandler = () => {
        setTimeout(() => setAddComment(false), 1000);
        document.body.style.overflow = 'auto';
    };
    
    const closeModalByLayout = (targetModal) => {
        if (targetModal) {
            setAddComment(false);
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {

        if (addComment) {
            const modal = document.querySelector('.modal');
            modal.scrollIntoView({behavior: 'smooth'});
            document.body.style.overflow = 'hidden';
        }

    }, [addComment]);

    return (
        <div className={`${classes.wrap} div`}>
            {commentsLength && <h3 className={classes.noComments}>No comments</h3>}
            {!commentsLength && <table className={classes.table}>
                <thead className={classes.table__head}>
                    <tr className={classes.table__tr}>
                        <th className={classes.table__th}>Username</th>
                        <th className={classes.table__th}>Country</th>
                        <th className={classes.table__th}>Comment date</th>
                        <th className={classes.table__th}>Comment</th>
                    </tr>
                </thead>
                <tbody className={classes.table__body}>
                    {comments.map((comment, i) => <Comment key={comment.id} name={comment.name} text={comment.text} date={comment.date} country={comment.country} id={comment.id} />)}
                </tbody>
            </table>}
            <div className={classes['table__btn-container']}>
                <button onClick={showAddCommentFormHandler} type='button' className={classes.table__btn}>Add new comment</button>
            </div>
            {addComment && <Modal className='modal' cancelHandler={cancelHandler} closeModalByLayout={closeModalByLayout} />}
        </div>
     );
}
 
export default Comments;
