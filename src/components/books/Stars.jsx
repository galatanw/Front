import {useContext, useState} from 'react'
import { UsingBooks } from '../../App';
import styles from './stars.module.css'
export default function StarRating({id,rate}) {
const dispatch=useContext(UsingBooks)
  const [rating, setRating] = useState(rate||0);
  const [hover, setHover] = useState(0);
  return (
    <div className={styles.button}>
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? styles.on : styles.off}
             onClick={() => {dispatch({value:index,type:'rating',id:id}); setRating(index)}}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};