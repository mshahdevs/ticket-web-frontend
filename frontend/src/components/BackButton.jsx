import { FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
export const BackButton = ({ url }) => {
  return (
    <Link to={url} className='btn-back'>
      <FaArrowAltCircleLeft size={14} />
      Back
    </Link>
  );
};
