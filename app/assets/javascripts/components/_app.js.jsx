var App = React.createClass({
  getInitialState() {
    return { family: undefined, totalLessonCount: 0, students: [], showAddStudent: false, 
 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response[0], 
                        totalLessonCount: response[0].week_count, 
                        students: response[1] });
      }
    });
  },
  toggleNewStudentStudent() {
    var showStudent = this.state.showAddStudent ? false : true;
    this.setState({ showAddStudent: showStudent });
  },
  handleNewStudent(student) {
    var students = this.state.students;
    students.push(student);
    this.setState({ students: students });
  },
  handleEdit(student) {
    var students = this.state.students;
    var index = students.indexOf(student);
    students[index] = student;
    this.setState({ students: students });
  },
  adjustLessonCount(student) {
    // update the student and students array
    var students = this.state.students;
    var studentIndex = students.indexOf(student);
    students[studentIndex] = student;

    // update the lesson count
    var newTotal = 0;
    students.map((student) => {
      newTotal += student.lesson_count;
    });

    this.setState({ totalLessonCount: newTotal, students: students });
  },
  getLessonCount() {
    return this.state.totalLessonCount;
  },
  handleDeletedStudent(student) {
    var students = this.state.students;
    var studentIndex = students.indexOf(student);
    students.splice(studentIndex, 1);

    this.adjustLessonCount(student);
  },
  render() {
    if ( !this.state.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div>
        <Header family={this.state.family} 
                lessonCount={this.state.totalLessonCount} 
                students={this.state.students}
                toggleNewStudentStudent={this.toggleNewStudentStudent} />
        <Body   passLessonCount={this.adjustLessonCount} 
                students={this.state.students} 
                handleSubmit={this.handleNewStudent}
                handleDeletedStudent={this.handleDeletedStudent} 
                toggleNewStudentStudent={this.toggleNewStudentStudent} 
                showAddStudent={this.state.showAddStudent} />
      </div>
    )
  }
});