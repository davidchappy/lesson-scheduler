var Body = React.createClass({
  getInitialState() {
    return { 
      confirmationPage: false
    }
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
      data: { 
              lesson_period: {  instrument_id: instrumentId, teacher_id: teacherId,
                                default_lesson_length: lessonPeriod.defaultLessonLength, 
                                form_id: this.props.form.id },
              name: name 
            },
      success: (response) => {
        var lessonPeriod = response["lesson_period"];
        var student = response["student"];
        this.props.handleEdit(lessonPeriod, student);
      }
    });
  },
  passLessonCount(count, lessonPeriod) {
    lessonPeriod.lesson_count = count;

    // update the lessonPeriods array
    var lessonPeriods = this.props.lessonPeriods;
    var index; 
    lessonPeriods.map( (l, i) => {
      index = l.id === lessonPeriod.id ? i : index;
    });
    lessonPeriods[index] = lessonPeriod;

    this.props.passLessonCount(lessonPeriods);
  },
  passNewLessonPeriod(lessonPeriod, student) {
    this.props.toggleNewLessonPeriod();
    this.props.handleSubmit(lessonPeriod, student);  
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
      var student;
      this.props.students.map((s, index) => {
        if (s.id === lessonPeriod.student_id) {
          student = s;
        }
      })

      return (
        <LessonPeriod key={lessonPeriod.id} 
                      lessonPeriod={lessonPeriod} 
                      student={student}
                      instruments={this.props.instruments} 
                      teachers={this.props.teachers}
                      updateLessonCount={this.passLessonCount} 
                      handleDelete={this.handleDelete}
                      handleEdit={this.handleEdit} />
      )
    })

    return (
      <div className="wrapper">
        <div className="body container">      
          {this.state.confirmationPage ?
            <Confirmation toggleConfirmationPage={this.toggleConfirmationPage}
                          submitForm={this.props.submitForm} 
                          lessonPeriods={this.props.lessonPeriods} 
                          lessonCount={this.props.lessonCount} /> :
            <div>
              <div className="lesson-periods row">
                {lessonPeriods}
                {this.props.isCreating ? 

                  <NewLessonPeriod  {...this.props} 
                                    handleSubmit={this.passNewLessonPeriod} /> :

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