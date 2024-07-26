import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react"
import EmployeeForm from "./EmployeeForm";

const EmployeeList=()=>{
    const [employee,setEmployee]=useState([]);
    const [open,setOpen]=useState(false);
    const [editEmployee,setEditEmployee]=useState(null);

    const fetchEmployees=async()=>{
        const response=await axios.get("http://localhost:8000/employees");
        setEmployee(response.data)
    }

    useEffect(()=>{
        fetchEmployees();
    },[]);

    const handleDelete=async(id)=>{
        await axios.delete(`http://localhost:8000/employees/${id}`);
        fetchEmployees();
    }

    const handleEdit=(employee)=>{
        setEditEmployee(employee);
        setOpen(true);
    }

    const handleClose=()=>{
        setOpen(false);
        setEditEmployee(null);
    };
    
    return (
        <div>
            <Button variant="contained" color="primary" onClick={()=>setOpen(true)}>
                Add Employee
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell> 
                            <TableCell>Departmant</TableCell> 
                            <TableCell>Age</TableCell>
                            <TableCell>Year</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employee.map((employee)=>(
                            <TableRow >
                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.age}</TableCell>
                                <TableCell>{employee.year}</TableCell>
                                <TableCell>
                                    <Button onClick={()=>handleEdit(employee)} color="primary">Edit</Button>
                                    <Button onClick={()=>handleDelete(employee.id)} color="primary"> Delete</Button>
                                </TableCell>

                            </TableRow>
                        
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EmployeeForm  open={open} handleClose={handleClose} fetchEmployees={fetchEmployees} editEmployee={editEmployee}/>
            <EmployeeForm/>
        </div>
    )

}

export default EmployeeList;