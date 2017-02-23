var Body = React.createClass({
  getInitialState() {
    return { 
      instruments: [], 
      teachers: [],
      confirmationPage: false
    }
  },
  componentDidMount() {
    $.ajax({
      url: `/api/v1/instruments.json`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ instruments: response });
      }
    });
    $.ajax({
      url: `/api/v1/teachers.json`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ teachers: response });
      }
    });
  },
  handleDelete(student) {
    var id = student.id;
    $.ajax({
      url: `/api/v1/students/${id}.json`, 
      type: 'DELETE',
      success: (response) => { 
        this.props.handleDeletedStudent(student);
      }
    });
  },
  handleEdit(name, instrumentId, teacherId, student) {
    var id = student.id;
    $.ajax({
      url: `/api/v1/students/${id}.json`, 
      type: 'PUT',
      data: { student: { student_name: name, instrument_id: instrumentId, teacher_id: teacherId } },
      success: (student) => { 
        console.log(student);
      }
    });
  },
  handleTypeName() {
    if($("#studentName").val().length > 1 && !this.state.instrumentEnabled) {
      console.log("From student name");
      this.setState({ instrumentEnabled: true })
    }
  },
  handleInstrumentSelect() {
    this.setState({ teacherEnabled: true })
    // handle updating teacher list
  },
  handleTeacherSelect() {
    this.setState({ submitEnabled: true })
  },
  passLessonCount(count, student) {
    student.lesson_count = count;
    this.props.passLessonCount(student);
  },
  handleSubmit(student) {
    this.setState({ showAddStudent: false })
    this.props.handleSubmit(student);  
  },
  toggleConfirmationPage() {
    var confirmation = this.state.confirmationPage ? false : true;
    this.setState({ confirmationPage: confirmation });
  },
  submitForm() {
    // 
  },
  render() {
    if ( !this.props.students ) {
      return (
        <div>
          <p>Loading Students..</p>
        </div>
      )
    }

    var students = this.props.students.map((student) => {
      return (
        <Student key={student.id} 
              student={student} 
              updateLessonCount={this.passLessonCount} 
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              instruments={this.state.instruments} 
              teachers={this.state.teachers} />
      )
    })

    return (
      <div className="wrapper">
        <div className="body container">      
          {this.state.confirmationPage ? 
            <div className="confirmation-page"> 
              <button className="btn btn-default" 
                      onClick={this.toggleConfirmationPage}>Back</button>
              <div></div>
              <div>
                <button className="btn btn-success" 
                        onClick={this.submitForm}>Submit Form!</button>
              </div>
            </div> :
            <div>
              <div className="students row">
                {students}
                {this.props.showAddStudent ? 

                  <NewStudent   instruments={this.state.instruments} 
                                teachers={this.state.teachers} 
                                handleTypeName={this.handleTypeName}
                                handleInstrumentSelect={this.handleInstrumentSelect}
                                handleTeacherSelect={this.handleTeacherSelect}  
                                handleSubmit={this.handleSubmit} /> :

                  <div className="new-student-button col-sm-6 col-md-4">
                    <button id="add-student" className={"btn btn-default add-student"} 
                      onClick={this.props.toggleNewStudentStudent}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 
                      <span className="button-text">Add a Student</span>
                    </button>
                  </div>
                }  
              </div>
              <div className="submit-form row">
                <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                  <button className="btn btn-primary submit-form-button" 
                          onClick={this.toggleConfirmationPage}>Submit Form</button>
                </div>
              </div>
            </div>
          } 
        </div>
      </div>
    )
  }
});