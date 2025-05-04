import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTickets, reset } from '../store/slices/tickets/ticketSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spinner } from '../components/Spinner';
import { BackButton } from '../components/BackButton';
export default function NewTicket() {
  const { user } = useSelector((state) => state.auth);

  const { isLoading, isError, message, isSuccess } = useSelector(
    (state) => state.ticket
  );
  const [name] = useState(user?.name);
  const [email] = useState(user?.email);
  const [product, setProduct] = useState('iPhone');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onSubmit(event) {
    event.preventDefault();
    dispatch(createTickets({ product, description }));
  }
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
      navigate('/tickets');
    }
    dispatch(reset());
  }, [dispatch, message, isError, isSuccess, navigate]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url='/' />
      <section className='heading'>
        <h1>Create New Ticket</h1>
        <h4>Please fill out the form below </h4>
      </section>
      <section className='form1'>
        <div className='form-container'>
          <div className='form-group-ticket'>
            <label htmlFor='name'>Customer Name</label>
            <input type='text' name='name' id='name' value={name} disabled />
          </div>
          <div className='form-group-ticket'>
            <label htmlFor='email'>Customer Email</label>
            <input type='email' name='email' id='name' value={email} disabled />
          </div>
          <form onSubmit={onSubmit}>
            <div className='form-group-ticket'>
              <label htmlFor='product'>Product</label>
              <select
                name='product'
                value={product}
                id='product'
                onChange={(e) => setProduct(e.target.value)}
              >
                <option value='iPhone'>iPhone</option>
                <option value='Macbook Pro'>Macbook Pro</option>
                <option value='iMac'>iMac</option>
                <option value='iPad'>iPad</option>
              </select>
            </div>
            <div className='form-group-ticket'>
              <label htmlFor='description'>Description of the issue</label>
              <textarea
                name='description'
                id='description'
                className='form-control'
                placeholder='Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className='form-group-ticket'>
              <button className='btn btn-block'>Submit</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
