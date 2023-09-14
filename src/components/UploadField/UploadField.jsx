import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import FormatSizeIcon from '@mui/icons-material/FormatSize';
import { setStudents } from 'store/studentsSlice';
import { useDispatch } from 'react-redux';
import { ListStyled, VisuallyHiddenInput } from './UploadField.styled';
import { toast } from 'react-toastify';

const UploadField = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileData, setFileData] = useState('');
  const dispatch = useDispatch();
  const handleFileUpload = e => {
    if (e.target.files[0].type !== 'text/plain') {
      toast.error('You upload wrong type document!');
      return;
    }

    const file = e.target.files[0];
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = event => {
      const content = event.target.result;
      setFileData(content);
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    const students = fileData
      .trim()
      .split('\n')
      .map(line => {
        const [
          lastName,
          firstName,
          grade,
          classroom,
          bus,
          teacherLastName,
          teacherName,
        ] = line.trim().split(',');
        return {
          lastName,
          firstName,
          grade,
          classroom,
          bus,
          teacherLastName,
          teacherName,
        };
      });

    const uniqueStudents = students.filter(
      (student, index, self) =>
        index ===
        self.findIndex(
          s =>
            s.grade === student.grade &&
            s.lastName === student.lastName &&
            s.firstName === student.firstName &&
            s.classroom === student.classroom &&
            s.bus === student.bus &&
            s.teacherLastName === student.teacherLastName &&
            s.teacherName === student.teacherName
        )
    );
    dispatch(setStudents(uniqueStudents));
  }, [fileData, dispatch]);
  return (
    <>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        href="#file-upload"
        onChange={handleFileUpload}
      >
        Upload a file
        <VisuallyHiddenInput type="file" />
      </Button>
      {uploadedFile && (
        <ListStyled
          primary="Name"
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        >
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Name" secondary={uploadedFile.name} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FormatSizeIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Type" secondary={uploadedFile.type} />
          </ListItem>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <FullscreenExitIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Size"
              secondary={`${uploadedFile.size} bytes`}
            />
          </ListItem>
        </ListStyled>
      )}
    </>
  );
};

export default UploadField;
