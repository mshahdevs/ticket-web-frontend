import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <section className='heading'>
        <h1>What do you need help with?</h1>
        <p>Please choose from an option below</p>
      </section>
      <div className='btn-links'>
        <div>
          <Link to={'/new-ticket'}>
            <FaQuestionCircle />
            Create New ticket
          </Link>
        </div>
        <div className='view-div'>
          <Link to={'/tickets'} className='view-btn'>
            <FaTicketAlt /> View My Tickets
          </Link>
        </div>
      </div>
    </>
  );
};
