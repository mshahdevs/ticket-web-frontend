import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  closeTicket,
  getSingleTicket,
} from '../store/slices/tickets/ticketSlice';
import Modal from 'react-modal';
import {
  getNotes,
  createNote,
  reset as noteReset,
} from '../store/slices/notes/noteSlice';
import { useParams, useNavigate } from 'react-router-dom';
import { BackButton } from '../components/BackButton';
import { Spinner } from '../components/Spinner';
import axios from 'axios';
import { NoteItem } from '../components/NoteItem';
import { FaPlus } from 'react-icons/fa';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');
export const Ticket = () => {
  const { ticket, isError, isLoading, message } = useSelector(
    (state) => state.ticket
  );
  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [qrCode, setQrCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ticketId } = useParams();

  // Download QR code function
  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrCode;
    link.download = `ticket-${ticketId}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const generateQRCode = async () => {
    try {
      const response = await axios.post(
        'http://localhost:8080/api/qr/generate',
        {
          data: JSON.stringify({
            ticket,
            timestamp: new Date().toISOString(),
          }),
        }
      );
      setQrCode(response.data.qrCode);
    } catch (error) {
      console.log('Error: Generating QR', error);
    }
  };

  //Modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  function onNoteSubmit(e) {
    e.preventDefault();
    dispatch(createNote({ noteText, ticketId }));
    closeModal();
  }
  useEffect(() => {
    generateQRCode();
    if (isError) {
      toast.error(message);
    }
    dispatch(getSingleTicket(ticketId));
    dispatch(getNotes(ticketId));
  }, [dispatch, message, isError, ticketId]);

  const onTicketClose = () => {
    dispatch(closeTicket(ticketId));
    toast.success('Ticket Closed!');
    navigate('/tickets');
  };
  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h4>Something went wrong</h4>;
  }

  return (
    <>
      <div className='ticket-page'>
        <header className='ticket-header'>
          <BackButton url='/tickets' />
          <h2>
            Ticket ID: {ticket._id}
            <span className={`status status-${ticket.status}`}>
              {ticket.status}
            </span>
          </h2>
          <h3>
            Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
          </h3>
          <h3>Product: {ticket.product}</h3>
          <hr />
          <div className='ticket-desc'>
            <h3>Description of Issue</h3>
            <p>{ticket.description}</p>
          </div>
          {qrCode && (
            <div className='qr-display'>
              <img src={qrCode} alt='QR Code' className='qr-img' />
              <p>Scan this code to view ticket details</p>
              <button onClick={downloadQR} className='download-qr-btn'>
                Download QR code
              </button>
            </div>
          )}
          <h2>Notes</h2>
        </header>
        {ticket.status !== 'closed' && (
          <button className='btn' onClick={openModal}>
            <FaPlus /> Add Note
          </button>
        )}

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel='Add Note'
        >
          <h2>Add Note</h2>
          <button onClick={closeModal}>X</button>
          <form onSubmit={onNoteSubmit}>
            <div>
              <textarea
                name='notes'
                onChange={(e) => setNoteText(e.target.value)}
                placeholder='add a note...'
                id='note-text'
              ></textarea>
            </div>
            <div>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </Modal>
        {notes.map((note) => (
          <NoteItem key={note._id} note={note} />
        ))}
        {ticket.status !== 'closed' && (
          <button onClick={onTicketClose} className=' btn-danger'>
            Close Ticket
          </button>
        )}
      </div>
    </>
  );
};
