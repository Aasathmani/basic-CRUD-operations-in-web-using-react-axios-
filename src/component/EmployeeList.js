// src/components/EmployeeList.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EmployeeForm from './EmployeeForm';
import { fetchEmployees, deleteEmployee } from '../redux/actions';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employees);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const [open, setOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditEmployee(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Employee
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Year</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.dept}</TableCell>
                <TableCell>{employee.age}</TableCell>
                <TableCell>{employee.year}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEdit(employee)} color="primary">Edit</Button>
                  <Button onClick={() => handleDelete(employee.id)} color="secondary">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <EmployeeForm open={open} handleClose={handleClose} editEmployee={editEmployee} />
    </div>
  );
};

export default EmployeeList;
