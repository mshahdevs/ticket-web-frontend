import { userAuthStatus } from '../hooks/userAuthStatus';
import { Navigate } from 'react-router-dom';
import { Spinner } from './Spinner';

export default function PrivateRoute({ children }) {
  const { loggedIn, checkingStatus } = userAuthStatus();
  if (checkingStatus) {
    return null;
  }
  if (!loggedIn) {
    return <Navigate to='/login' />;
  }
  return children;
}
