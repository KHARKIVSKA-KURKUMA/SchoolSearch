export const matchStudentsWithTeachers = (students, teachers) => {
  const result = students.map(student => {
    const studentTeachers = teachers.filter(
      teacher => teacher.classroom === student.classroom
    );
    return {
      ...student,
      teachers: studentTeachers,
    };
  });

  return result;
};
