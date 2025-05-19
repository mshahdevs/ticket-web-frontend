import { useEffect, useState } from 'react';
import { FaSignInAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from 'react-icons/fa6';
// import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { login, reset } from '../store/slices/auth/authSlice';
import { toast } from 'react-toastify';
export const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePasswordVisible1 = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      return;
    }
    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }

    //Success then redirect to Home Page
    //  if(is)
  }, [dispatch, isSuccess, navigate, user, isError]);
  return (
    <div className='container'>
      <div className='login'>
        <section className='heading'>
          <h1 className='login_text'>
            <FaSignInAlt />
            Login
          </h1>
          <p>Please login your account</p>
        </section>
        <section className='form'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <input
                type='email'
                onChange={onChange}
                value={email}
                placeholder='Enter your email address'
                name='email'
                id='email'
                required
              />
            </div>
            <div className='form-group'>
              <input
                type={isPasswordVisible ? 'text' : 'password'}
                onChange={onChange}
                value={password}
                placeholder='Enter your password'
                name='password'
                id='password'
                required
              />
              <span className='eye-icon' onClick={handlePasswordVisible1}>
                {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>

            <div className='form-group'>
              <button className='btn_submit'>Submit</button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
