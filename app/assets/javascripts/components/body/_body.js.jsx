var Body = React.createClass({
  delDeleteLessonPeriod(lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'DELETE',
      success: (response) => { 
        // window.flash_messages.printMessages(response.messages);
        this.props.updateFromDeleteLessonPeriod(lessonPeriod);
      }
    });
  },
  putEditLessonPeriod(name, instrumentId, teacherId, lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'PUT',
      data: { 
              lesson_period: {  instrument_id: instrumentId, teacher_id: teacherId,
                                default_lesson_length: lessonPeriod.defaultLessonLength, 
                                locked: lessonPeriod.locked,
                                form_id: this.props.form.id },
              name: name 
            },
      success: (response) => {
        // window.flash_messages.printMessages(response.messages);
        var lessonPeriod = response.lesson_period;
        var student = response.student;
        this.props.updateFromEditLessonPeriod(lessonPeriod, student);
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
                      {...this.props}
                      updateLessonCount={this.passLessonCount} 
                      handleDelete={this.delDeleteLessonPeriod}
                      passEditLessonPeriod={this.putEditLessonPeriod} />
      )
    });

    var disabled = this.props.isSubmittable ? false : true;

    return (
      <div className="wrapper">
        <div className="body container">      
          {this.props.isConfirming ?
            <Confirmation {...this.props} /> :
            <div>
              <div className="lesson-periods row">
                {lessonPeriods}
                {this.props.isCreating ? 

                  <NewLessonPeriod  {...this.props} /> :

                  <div className="new-lesson-period-button col-sm-6 col-md-4">
                    <button id="add-lesson-period" className={"btn btn-default add-lesson-period"} 
                      onClick={this.props.handleClickAddStudent}>
                      <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 
                      <span className="button-text">Add a Lesson Period</span>
                    </button>
                  </div>
                }  
              </div>
              <div className="submit-form row">
                <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                  <button className="btn btn-primary submit-form-button" disabled = {disabled}
                          onClick={this.props.handleToggleConfirming}>Submit Form</button>
                </div>
              </div>
            </div>
          } 
        </div>
      </div>
    )
  }
});