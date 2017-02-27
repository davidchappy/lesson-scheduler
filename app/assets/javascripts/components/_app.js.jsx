var App = React.createClass({
  getInitialState() {
    return {  family: undefined, totalLessonCount: 0, 
              students: [], showAddStudent: false, 
              form: undefined, alreadySubmitted: false }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => {
        if(response.form.submitted === true) {
          this.setState({ alreadySubmitted: true })
        }
        this.setState({ family: response.family,  
                        students: response.students,
                        form: response.form,
                        totalLessonCount: response.form.week_count});
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
  submitForm() {
    var id = this.state.form.id;
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'PUT',
      success: (form) => { 
        console.log(form);
      }
    });
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
                toggleNewStudentStudent={this.toggleNewStudentStudent}
                alreadySubmitted={this.state.alreadySubmitted} />
        {this.state.alreadySubmitted ? 
          <AlreadySubmitted submitted_at={this.state.form.submitted_at} /> :
          <Body   passLessonCount={this.adjustLessonCount} 
                  students={this.state.students} 
                  form={this.state.form}
                  handleSubmit={this.handleNewStudent}
                  handleDeletedStudent={this.handleDeletedStudent} 
                  toggleNewStudentStudent={this.toggleNewStudentStudent} 
                  showAddStudent={this.state.showAddStudent} 
                  submitForm={this.submitForm} />
        }
      </div>
    )
  }
});