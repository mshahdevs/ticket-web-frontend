import { useEffect, useState } from 'react';
import { FaUser, FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../store/slices/auth/authSlice';
import { Spinner } from '../components/Spinner';
export const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfrimPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = formData;
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
  const handlePasswordVisible2 = () => {
    setIsConfirmPasswordVisible(!isConfrimPasswordVisible);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Password do not match');
      return;
    } else {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(register(userData));
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    //Redirect if user loggedin
    if (isSuccess || user) {
      navigate('/');
      dispatch(reset());
    }
  }, [isError, isSuccess, user, navigate, dispatch]);

  //Spinner
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser />
          Register
        </h1>
        <p>Please create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={handleSubmit}>
          <div className='form-group'>
            <input
              type='text'
              onChange={onChange}
              value={name}
              placeholder='Enter your name'
              name='name'
              id='name'
              required
            />
          </div>
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
            <span onClick={handlePasswordVisible1}>
              {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className='form-group'>
            <input
              type={isConfrimPasswordVisible ? 'text' : 'password'}
              onChange={onChange}
              value={password2}
              placeholder='Confirm your password'
              name='password2'
              id='password2'
              required
            />
            <span onClick={handlePasswordVisible2}>
              {isConfrimPasswordVisible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className='form-group'>
            <button>Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};
