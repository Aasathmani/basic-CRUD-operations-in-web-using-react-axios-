// src/redux/actions.js
import axios from 'axios';

export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

export const fetchEmployees = () => async (dispatch) => {
  dispatch({ type: FETCH_EMPLOYEES_REQUEST });
  try {
    const response = await axios.get('http://localhost:8000/employees');
    dispatch({ type: FETCH_EMPLOYEES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EMPLOYEES_FAILURE, error });
  }
};

export const addEmployee = (employee) => async (dispatch) => {
  const response = await axios.post('http://localhost:8000/employees', employee);
  dispatch({ type: ADD_EMPLOYEE, payload: response.data });
};

export const updateEmployee = (employee) => async (dispatch) => {
  const response = await axios.put(`http://localhost:8000/employees/${employee.id}`, employee);
  dispatch({ type: UPDATE_EMPLOYEE, payload: response.data });
};

export const deleteEmployee = (id) => async (dispatch) => {
  await axios.delete(`http://localhost:8000/employees/${id}`);
  dispatch({ type: DELETE_EMPLOYEE, payload: id });
};
