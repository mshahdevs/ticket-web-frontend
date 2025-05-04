import React from 'react';
import { useSelector } from 'react-redux';
export const NoteItem = ({ note }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div
      className='note'
      style={{
        backgroundColor: note.isStaff ? 'rgba(0,0,0,0.5)' : '#fff',
        color: note.isStaff ? '#fff' : '#000',
      }}
    >
      <h5>
        Note from {note.isStaff ? <span>Staff</span> : <span>{user.name}</span>}
      </h5>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  );
};
