import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tickets/';

const createTicket = async (ticketData, token) => {
  // const config = {
  //     headers:{
  //         Authorization: `Bearer ${token}`
  //     }
  // }
  const response = await axios.post(API_URL, ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const closedTicket = async (ticketId, token) => {
  const response = await axios.put(
    API_URL + ticketId,
    { status: 'closed' },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

const getAllTickets = async (token) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
const getTicket = async (ticketId, token) => {
  const response = await axios.get(API_URL + ticketId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const ticketService = {
  createTicket,
  getAllTickets,
  getTicket,
  closedTicket,
};
