// src/components/EmployeeForm.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { addEmployee, updateEmployee } from '../redux/actions';

const EmployeeForm = ({ open, handleClose, editEmployee }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    dept: '',
    age: '',
    year: ''
  });

  useEffect(() => {
    if (editEmployee) {
      setFormData({
        name: editEmployee.name,
        dept: editEmployee.dept,
        age: editEmployee.age,
        year: editEmployee.year
      });
    } else {
      setFormData({
        name: '',
        dept: '',
        age: '',
        year: ''
      });
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = () => {
    if (editEmployee) {
      dispatch(updateEmployee({ ...formData, id: editEmployee.id }));
    } else {
      dispatch(addEmployee(formData));
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{editEmployee ? 'Edit Employee' : 'Add Employee'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="name"
          label="Name"
          fullWidth
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="dept"
          label="Department"
          fullWidth
          value={formData.dept}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="age"
          label="Age"
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="year"
          label="Year"
          fullWidth
          value={formData.year}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          {editEmployee ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EmployeeForm;
