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
  handleDelete(lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'DELETE',
      success: (response) => { 
        this.props.handleDeletedLessonPeriod(lessonPeriod);
      }
    });
  },
  handleEdit(name, instrumentId, teacherId, lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'PUT',
      data: { lesson_period: { instrument_id: instrumentId, teacher_id: teacherId },
              name: name },
      success: (lessonPeriod) => { 
        console.log(lessonPeriod);
      }
    });
  },
  handleTypeName() {
    if($("#studentName").val().length > 1 && !this.state.instrumentEnabled) {
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
  passLessonCount(count, lessonPeriod) {
    lessonPeriod.lesson_count = count;
    this.props.passLessonCount(lessonPeriod);
  },
  handleSubmit(lessonPeriod) {
    this.setState({ showAddLessonPeriod: false })
    this.props.handleSubmit(lessonPeriod);  
  },
  toggleConfirmationPage() {
    var confirmation = this.state.confirmationPage ? false : true;
    this.setState({ confirmationPage: confirmation });
  },
  render() {
    if ( !this.props.lessonPeriods ) {
      return (
        <div>
          <p>Loading Lesson Periods..</p>
        </div>
      )
    }

    var lessonPeriods = this.props.lessonPeriods.map((lessonPeriod) => {
      return (
        <LessonPeriod key={lessonPeriod.id} 
                      lessonPeriod={lessonPeriod} 
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
            <Confirmation toggleConfirmationPage={this.toggleConfirmationPage}
                          submitForm={this.props.submitForm} /> :
            <div>
              <div className="lesson-periods row">
                {lessonPeriods}
                {this.props.showAddLessonPeriod ? 

                  <NewLessonPeriod    instruments={this.state.instruments} 
                                      teachers={this.state.teachers} 
                                      handleTypeName={this.handleTypeName}
                                      handleInstrumentSelect={this.handleInstrumentSelect}
                                      handleTeacherSelect={this.handleTeacherSelect}  
                                      handleSubmit={this.handleSubmit} 
                                      form={this.props.form} /> :

                  <div className="new-lesson-period-button col-sm-6 col-md-4">
                    <button id="add-lesson-period" className={"btn btn-default add-lesson-period"} 
                      onClick={this.props.toggleNewLessonPeriod}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 
                      <span className="button-text">Add a Lesson Period</span>
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