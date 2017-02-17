var Body = React.createClass({
  getInitialState() {
    return { 
      showAddStudent: false, 
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
  onButtonClick() {
    this.setState({ showAddStudent: true })
  },
  passLessonCount(count, form) {
    this.props.passLessonCount(count, form);
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

    return (
      <div className="wrapper">
        <div className="new-student-button">
          <button id="add-student" className={"btn btn-primary"} 
          onClick={this.onButtonClick}><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Student</button>
        </div>

        <div className="body container">       
          <AllForms forms={this.props.forms} passLessonCount={this.passLessonCount} 
          instruments={this.state.instruments} teachers={this.state.teachers} 
          showAddStudent={this.state.showAddStudent} handleTypeName={this.handleTypeName}
          handleInstrumentSelect={this.handleInstrumentSelect}
          handleTeacherSelect={this.handleTeacherSelect} 
          handleSubmit={this.handleSubmit}/>
        </div>
      </div>

     
    )
  }
});