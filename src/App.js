import './App.css';
import { Container, Typography } from '@mui/material';
import EmployeeList from './component/EmployeeList';

function App() {
  return (
    <Container>
      <Typography varient="h4" gutterBottom>
        Employee management
      </Typography>
      <EmployeeList/>

    </Container>
  );
}

export default App;
