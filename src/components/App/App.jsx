import StudentSearchForm from 'components/StudentSearchForm/StudentSearchForm';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  return (
    <div>
      <ToastContainer />
      <StudentSearchForm />
    </div>
  );
};
