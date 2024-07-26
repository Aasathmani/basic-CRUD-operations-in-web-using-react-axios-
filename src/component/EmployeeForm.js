import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react"

const EmployeeForm =({open,handleClose,fetchEmployees,editEmployee})=>{


    const [formData,setFormData]=useState({
        name: editEmployee ? editEmployee.name: "",
        department:editEmployee ? editEmployee.department: "",
        age: editEmployee ? editEmployee.age: "",
        year: editEmployee ? editEmployee.year: ""
    });

    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit= async ()=>{
        if(editEmployee){
            await axios.put(`http://localhost:8000/employees/${editEmployee.id}`, formData)
        }else{
            await axios.post('http://localhost:8000/employees',formData)
        }
        fetchEmployees();
        handleClose();
    }

    return(
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{editEmployee ? 'Edit employee': 'Add employee'}</DialogTitle>
                <DialogContent>
                    <TextField 
                    autoFocus
                    margin="dense"
                    name="name"
                    label= "Name"
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name="department"
                    label="Department"
                    fullWidth
                    value={editEmployee ? editEmployee.department: formData.department}
                    onChange={handleChange}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name="age"
                    label="Age"
                    fullWidth
                    value={editEmployee ? editEmployee.age :formData.age}
                    onChange={handleChange}
                    />
                    <TextField
                    autoFocus
                    margin="dense"
                    name="year"
                    label="Year"
                    fullWidth
                    value={editEmployee ? editEmployee.year: formData.year}
                    onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{editEmployee ? 'update' : 'Submit'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default EmployeeForm