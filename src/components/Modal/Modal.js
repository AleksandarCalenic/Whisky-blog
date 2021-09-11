import { useState } from "react";
import { useRef, useContext } from "react";
import { useParams } from "react-router";
import StoreContext from "../../store/store-context";
import classes from './Modal.module.css';

const Modal = ({ cancelHandler, closeModalByLayout, className }) => {

    const commentRef = useRef();
    const modalRef = useRef();
    const param = useParams();
    const context = useContext(StoreContext);
    const [disabled, setDisabled] = useState(false);

    const cancelHandlera = e => {
        let closeModal = modalRef.current === e.target;
        closeModalByLayout(closeModal);
    };

    const changeHandler = () => {
        if (commentRef.current.value.trim() === '') {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };
  
    const submitHandler = (e) => {
        e.preventDefault();

        const dateObj = new Date();
        const month = dateObj.getMonth()+1;
        const day = String(dateObj.getDate()).padStart(2, '0');
        const year = dateObj.getFullYear();
        const date = `${day}.${month}.${year}.`;

        const commenet = commentRef.current.value.trim();

        const userName = context.name;

        const token = context.token;

        const commentsFetch = async() => {
            try {
                const response = await fetch('https://geolocation-db.com/json/fb363670-e22a-11eb-a464-59f706281067');
                const data = await response.json();
                const country = data.country_name;

                await fetch(`https://vezba-ec7fa-default-rtdb.europe-west1.firebasedatabase.app/whiskies/${param.whiskyId}/comments.json`, {
                    method: 'POST',
                    body: JSON.stringify({
                        date: date,
                        text: commenet,
                        name: userName,
                        userId: token,
                        country: `${country === 'United States' ? data.state : country}`
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });

                context.fetchWhisky();
    
            } catch {
                
            }
        };

        commentsFetch();

        cancelHandler();
    };

    const modalClass = `${classes.overlay} ${className ? className : ''}`;
   
    return ( 
        <div className={modalClass} onClick={cancelHandlera} ref={modalRef}>
            <form onSubmit={submitHandler} className={classes.form}>
                <label className={classes.form__label} htmlFor="comment">Add your comment</label>
                <textarea onChange={changeHandler} className={classes.form__textarea} name="comment" id="comment" cols="30" rows="10" ref={commentRef}></textarea>
                <button className={classes.form__add} type='submit' disabled={!disabled}>Add</button>
                <button className={classes.form__cancel} type='button' onClick={cancelHandler}></button>
            </form>
        </div>
     );
}

export default Modal;