// import { FasigInAlt } from 'react-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../store/slices/auth/authSlice';
import ticketlogo from '../assets/ticket.png';
export const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    navigate('/');
    dispatch(logout());
  };

  return (
    <header className='header'>
      <div className='logo'>
        <Link to={'/'} className='logo-text'>
          <img src={ticketlogo} width={40} alt='' />
          Shah's TicketDesk
        </Link>
        <ul>
          {user ? (
            <li>
              <button onClick={onLogout} id='logout-btn'>
                Logout
              </button>
            </li>
          ) : (
            <>
              <li>
                <Link to={'/login'}>Login</Link>
              </li>
              <li>
                <Link to={'/register'}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  );
};
