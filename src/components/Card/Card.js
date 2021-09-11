import classes from './Card.module.css';

const Card = ({ children, className }) => {

    const classCard = `${classes.card} ${className ? className : ''}`;

    return ( 
        <div className={classCard}>
            {children}
        </div>
     );
}
 
export default Card;