import { useState } from 'react';
import { useSelector } from 'react-redux';
import { studentDataSelector } from 'store/selectors';
import { Button, TextField, Menu, MenuItem, Fade } from '@mui/material';
import UploadField from 'components/UploadField/UploadField';
import {
  Container,
  ResultWrap,
  Form,
  TableCell,
  TableRow,
  TableHeader,
  StyledTable,
  StyledBtn,
  StyledLi,
  StyledUl,
} from './StudentSearchForm.styled';
import { toast } from 'react-toastify';
import { searchCategories } from './searchCategories';

const StudentSearchForm = () => {
  const [value, setValue] = useState('');
  const data = useSelector(studentDataSelector);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [searchCategory, setSearchCategory] = useState('');
  const [resultArray, setResultArray] = useState([]);
  // click menu
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  // chose some from menu
  const handleClose = e => {
    setAnchorEl(null);
    setSearchCategory(e.target.id);
    setValue('');
    setResultArray([]);
  };
  // search function
  const findStudents = (chosenCategory, value) => {
    return data.filter(student => student[chosenCategory] === value);
  };
  // on submit function
  const handleSubmit = e => {
    e.preventDefault();
    const chosenCategory = e.target[0].name;
    const resultArray = findStudents(chosenCategory, value);
    setResultArray(resultArray);
    if (resultArray.length === 0) {
      toast.error(
        'Sorry! Nothing Found! Your search returned no results. Try changing the conditions or double-checking your spelling, and then please submit your request again.'
      );
    } else {
      setValue('');
    }
  };
  const handleShowAllData = () => {
    setResultArray(data);
    setSearchCategory('');
  };
  /* --------------------------------- RENDER --------------------------------- */
  return (
    <Container>
      <UploadField />
      {data.length > 1 ? (
        <>
          <Button
            id="fade-button"
            aria-controls={open ? 'fade-menu' : undefined}
            aria-haspopup="true"
            variant="contained"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Search Menu
          </Button>
          <StyledBtn onClick={handleShowAllData} variant="outlined">
            Show all data
          </StyledBtn>
          <Menu
            id="fade-menu"
            MenuListProps={{
              'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {Object.keys(searchCategories).map(category => (
              <MenuItem key={category} id={category} onClick={handleClose}>
                {searchCategories[category].label}
              </MenuItem>
            ))}
          </Menu>
        </>
      ) : (
        <h3>Please upload .txt file</h3>
      )}

      <Form onSubmit={handleSubmit}>
        {searchCategory && (
          <>
            <TextField
              id="standard-basic"
              label={searchCategories[searchCategory].label}
              name={searchCategories[searchCategory].name}
              variant="standard"
              value={value}
              onChange={e =>
                setValue(e.currentTarget.value.toUpperCase().trim())
              }
            />
            <Button type="submit" variant="outlined">
              Search
            </Button>
          </>
        )}
      </Form>
      {resultArray.length !== 0 && (
        <ResultWrap>
          <h2>Results</h2>
          <StyledTable>
            <thead>
              <TableRow>
                <TableHeader>№</TableHeader>
                <TableHeader>Student Name</TableHeader>
                <TableHeader>Student Surname</TableHeader>
                <TableHeader>Grade</TableHeader>
                <TableHeader>Classroom</TableHeader>
                <TableHeader>Bus</TableHeader>
                <TableHeader>Teachers Name</TableHeader>
                <TableHeader>Teachers Surname</TableHeader>
              </TableRow>
            </thead>
            <tbody>
              {resultArray.map((student, index) => (
                <TableRow key={index}>
                  <TableCell>{index}</TableCell>
                  <TableCell>{student.firstName}</TableCell>
                  <TableCell>{student.lastName}</TableCell>
                  <TableCell>{student.grade}</TableCell>
                  <TableCell>{student.classroom}</TableCell>
                  <TableCell>{student.bus}</TableCell>
                  <TableCell>
                    <StyledUl>
                      {student.teachers.map((teacher, index) => (
                        <StyledLi key={index}>{teacher.teacherName}</StyledLi>
                      ))}
                    </StyledUl>
                  </TableCell>

                  <TableCell>
                    <StyledUl>
                      {student.teachers.map((teacher, index) => (
                        <StyledLi key={index}>
                          {teacher.teacherLastName}
                        </StyledLi>
                      ))}
                    </StyledUl>
                  </TableCell>
                </TableRow>
              ))}
            </tbody>
          </StyledTable>
        </ResultWrap>
      )}
    </Container>
  );
};

export default StudentSearchForm;
