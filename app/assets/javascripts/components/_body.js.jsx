var Body = React.createClass({
  getInitialState() {
    return { 
      instruments: [], 
      teachers: [],
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
  handleDelete(form) {
    var id = form.id;
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'DELETE',
      success: (response) => { 
        this.props.handleDeletedForm(form);
      }
    });
  },
  handleEdit(name, instrumentId, teacherId, form) {
    var id = form.id;
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'PUT',
      data: { form: { student_name: name, instrument_id: instrumentId, teacher_id: teacherId } },
      success: (form) => { 
        console.log(form);
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
  passLessonCount(count, form) {
    form.lesson_count = count;
    this.props.passLessonCount(form);
  },
  handleSubmit(form) {
    this.setState({ showAddStudent: false })
    this.props.handleSubmit(form);  
  },
  render() {
    if ( !this.props.forms ) {
      return (
        <div>
          <p>Loading Forms..</p>
        </div>
      )
    }

    var forms = this.props.forms.map((form) => {
      return (
        <Form key={form.id} 
              form={form} 
              updateLessonCount={this.passLessonCount} 
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              instruments={this.state.instruments} 
              teachers={this.state.teachers} />
      )
    })

    return (
      <div className="wrapper">
        <div className="new-student-button">
          <button id="add-student" className={"btn btn-primary add-student"} 
          onClick={this.props.toggleNewStudentForm}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Student</button>
        </div>

        <div className="body container">       
          <div className="forms row">
            {forms}
            {this.props.showAddStudent ? 
              <NewForm  instruments={this.state.instruments} 
                        teachers={this.state.teachers} 
                        handleTypeName={this.handleTypeName}
                        handleInstrumentSelect={this.handleInstrumentSelect}
                        handleTeacherSelect={this.handleTeacherSelect}  
                        handleSubmit={this.handleSubmit} /> :
              null
            }  
          </div>
        </div>
      </div>
    )
  }
});