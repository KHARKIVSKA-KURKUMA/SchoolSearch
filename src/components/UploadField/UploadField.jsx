import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { setData } from 'store/studentsSlice';
import { useDispatch } from 'react-redux';
import { StyledWrap, VisuallyHiddenInput } from './UploadField.styled';
import { toast } from 'react-toastify';
import { matchStudentsWithTeachers } from './matchStudentsWithTeachers';

const UploadField = () => {
  const [StudentFileData, setStudentFileData] = useState('');
  const [TeacherFileData, setTeacherFileData] = useState('');
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const dispatch = useDispatch();

  const handleFileUpload = e => {
    if (e.target.files[0].type !== 'text/plain') {
      toast.error('You upload wrong type document!');
      return;
    }
    if (e.target.name === 'student') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        const content = event.target.result;
        setStudentFileData(content);
      };
      reader.readAsText(file);
    } else {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = event => {
        const content = event.target.result;
        setTeacherFileData(content);
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    const students = StudentFileData.trim()
      .split('\n')
      .map(line => {
        const [lastName, firstName, grade, classroom, bus] = line
          .trim()
          .split(',')
          .map(item => item.trim());
        return {
          lastName,
          firstName,
          grade,
          classroom,
          bus,
        };
      });
    const teachers = TeacherFileData.trim()
      .split('\n')
      .map(line => {
        const [teacherLastName, teacherName, classroom] = line
          .trim()
          .split(',')
          .map(item => item.trim());
        return {
          teacherLastName,
          teacherName,
          classroom,
        };
      });
    setTeachers(teachers);
    setStudents(students);
  }, [StudentFileData, TeacherFileData]);

  useEffect(() => {
    if (students.length > 1 && teachers.length > 1) {
      const studentsWithTeachers = matchStudentsWithTeachers(
        students,
        teachers
      );
      dispatch(setData(studentsWithTeachers));
    }
  }, [students, teachers, dispatch]);
  return (
    <>
      <StyledWrap>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          href="#file-upload"
          onChange={handleFileUpload}
        >
          Upload a student file
          <VisuallyHiddenInput type="file" name="student" />
        </Button>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
          href="#file-upload"
          onChange={handleFileUpload}
        >
          Upload a teacher file
          <VisuallyHiddenInput type="file" name="teacher" />
        </Button>
      </StyledWrap>
    </>
  );
};

export default UploadField;
