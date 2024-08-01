// src/redux/reducers.js
import {
    FETCH_EMPLOYEES_REQUEST,
    FETCH_EMPLOYEES_SUCCESS,
    FETCH_EMPLOYEES_FAILURE,
    ADD_EMPLOYEE,
    UPDATE_EMPLOYEE,
    DELETE_EMPLOYEE
  } from './actions';
  
  const initialState = {
    employees: [],
    loading: false,
    error: null
  };
  
  const employeeReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_EMPLOYEES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case FETCH_EMPLOYEES_SUCCESS:
        return {
          ...state,
          loading: false,
          employees: action.payload
        };
      case FETCH_EMPLOYEES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.error
        };
      case ADD_EMPLOYEE:
        return {
          ...state,
          employees: [...state.employees, action.payload]
        };
      case UPDATE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.map((employee) =>
            employee.id === action.payload.id ? action.payload : employee
          )
        };
      case DELETE_EMPLOYEE:
        return {
          ...state,
          employees: state.employees.filter((employee) => employee.id !== action.payload)
        };
      default:
        return state;
    }
  };
  
  export default employeeReducer;
  