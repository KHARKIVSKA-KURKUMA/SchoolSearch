import StudentSearchForm from 'components/StudentSearchForm/StudentSearchForm';
import { ToastContainer } from 'react-toastify';
import { Container } from './App.styled';

export const App = () => {
  return (
    <Container>
      <ToastContainer />
      <StudentSearchForm />
    </Container>
  );
};
