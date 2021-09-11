import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import classes from './Loading.module.css';

const Loading = ({ className }) => {

    const loadingClass = `${classes.loading} ${className ? className : ''}`;

    return ( 
        <div>
            <AiOutlineLoading3Quarters className={loadingClass} />
        </div>
     );
}
 
export default Loading;