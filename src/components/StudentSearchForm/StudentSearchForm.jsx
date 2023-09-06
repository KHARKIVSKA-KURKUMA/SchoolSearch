import { TextField } from '@mui/material';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Container, InputContainer } from './StudentSearchForm.styled';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const StudentSearchForm = () => {
  return (
    <Container>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        href="#file-upload"
      >
        Upload a file
        <VisuallyHiddenInput type="file" />
      </Button>
      <InputContainer>
        <TextField
          id="standard-basic"
          label="Student Name"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Student Surname"
          variant="standard"
        />
        <TextField id="standard-basic" label="Grade" variant="standard" />
        <TextField id="standard-basic" label="Classroom" variant="standard" />
        <TextField id="standard-basic" label="Bus" variant="standard" />
        <TextField
          id="standard-basic"
          label="Teacher Name"
          variant="standard"
        />
        <TextField
          id="standard-basic"
          label="Teacher Surname"
          variant="standard"
        />
      </InputContainer>
    </Container>
  );
};

export default StudentSearchForm;
