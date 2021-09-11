import { useRef, useState, useContext } from 'react';

import { useHistory } from 'react-router';
import Loading from '../UI/Loading';
import StoreContext from '../../store/store-context';

import classes from '../../style/Login.module.css';

const Login = () => {

    const context = useContext(StoreContext);
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({username: false, password: false, email: false});
    const [showError, setShowError] = useState('');
    const [singup, setSingup] = useState(false);
    const emailRef = useRef();
    const passwordRef = useRef();
    const usernameRef = useRef();

    const toggleFormHandler = () => {
        setSingup(prev => !prev);
        setError({username: false, password: false, email: false});
    };

    const submitHandlerSingup = (event) => {
        event.preventDefault();
        submitHandler('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxIadj1NaIJRaeIVB0pXZ0gYjnMgoIHhc');
    };

    const submitHandlerLogin = (event) => {
        event.preventDefault();
        submitHandler('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxIadj1NaIJRaeIVB0pXZ0gYjnMgoIHhc');
    };

    const submitHandler = (url) => {

        setLoading(true);

        const entredEmail = emailRef.current.value.trim();
        const entredPassword = passwordRef.current.value.trim();
        let enteredUsername = '';
        if (singup && usernameRef.current.value.trim() !== '') {
            enteredUsername = usernameRef.current.value.trim();
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify({
                email: entredEmail,
                password: entredPassword,
                returnSecureToken: true,
                displayName: enteredUsername,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            setLoading(false);

            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(data => {
                    let errorMessage = 'Something went wrong!';

                    if (data && data.error && data.error.message) {
                        errorMessage = data.error.message;
                    }

                    throw new Error(errorMessage);
                })
            }
        }).then(data => {
            context.login(data.idToken, data.displayName);
            history.push('/whiskies');
            
        }).catch(err => {
            if (err.message === 'INVALID_EMAIL') {
                setError({email: true});
                setShowError('Invalid email');
            }
            if (err.message === 'INVALID_EMAIL') {
                setError({email: true});
                setShowError('Enter email');
            }
            if (err.message === 'EMAIL_EXISTS') {
                setError({email: true});
                setShowError('This email already used')
            }
            if (err.message === 'MISSING_PASSWORD') {
                setError({password: true});
                setShowError('Please enter password')
            }
            if (err.message === 'WEAK_PASSWORD') {
                setError({password: true});
                setShowError('Please enter password with 6 or more characters');
            }
            if (err.message === 'INVALID_PASSWORD') {
                setError({password: true});
                setShowError('Incorect password')
            }
        });
    };

    return ( 
        <section className={classes.form}>
            <form className={classes.form__form} onSubmit={!loading && singup ? submitHandlerSingup : submitHandlerLogin}>
                {singup && (
                <div>
                <div className={classes.form__container}>
                    <label className={classes.form__label} htmlFor="username">Username</label>
                    <input ref={usernameRef} className={classes.form__input} type="text" id='username' required />
                    {error.username && <span className={classes.form__error}>{showError}</span>}
                </div>
                <div className={classes.form__container}>
                    <label className={classes.form__label} htmlFor="email">Email</label>
                    <input ref={emailRef} className={classes.form__input} type="email" id='email' />
                    {error.email && <span className={classes.form__error}>{showError}</span>}
                </div>
                <div className={classes.form__container}>
                    <label className={classes.form__label} htmlFor="password">Password</label>
                    <input ref={passwordRef} className={classes.form__input} type="password" id='password' />
                    {error.password && <span className={classes.form__error}>{showError}</span>}
                </div>
                </div>
                )}
                {!singup && (
                    <div>
                        <div className={classes.form__container}>
                            <label className={classes.form__label} htmlFor="email">Email</label>
                            <input ref={emailRef} className={classes.form__input} type="email" id='email' />
                            {error.email && <span className={classes.form__error}>{showError}</span>}
                        </div>
                        <div className={classes.form__container}>
                            <label className={classes.form__label} htmlFor="password">Password</label>
                            <input ref={passwordRef} className={classes.form__input} type="password" id='password' />
                            {error.password && <span className={classes.form__error}>{showError}</span>}
                        </div>
                    </div>
                )}
                <div className={classes['form__submit-container']}>
                    {!loading && singup && <button type='submit' className={classes.form__submit}>Sing Up</button>}
                    {!loading && !singup && <button type='submit' className={classes.form__submit}>Login</button>}
                    {loading && <Loading className={classes.loading} />}
                </div>
            </form>
            <div>
                {!loading && <button onClick={toggleFormHandler} type='button' className={classes.form__toggleBtn}>{!singup ? 'Change to Sing Up Form' : 'Change to Login Form'}</button>}
            </div>
        </section>
     );
}
 
export default Login;