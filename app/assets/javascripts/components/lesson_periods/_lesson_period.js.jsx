var LessonPeriod = React.createClass({

  getInitialState() {
    return  { deleting: false, editing: false }
  },

  toggleEditing() {
    this.setState({ editing: !this.state.editing });
  },

  handleEditLessonPeriod(name, instrumentId, teacherId, defaultLessonLength) {
    this.toggleEditing();
    var lessonPeriod = this.props.lessonPeriod;
    lessonPeriod.defaultLessonLength = defaultLessonLength;
    this.props.editLessonPeriod(name, instrumentId, teacherId, lessonPeriod);
  },

  confirmDelete() {
    this.props.deleteLessonPeriod(this.props.lessonPeriod);
  },

  cancelDelete() {
    this.setState({ deleting: false, editing: false });
  },

  handleDelete() {
    this.setState({ deleting: true, editing: false });
  },

  render() {
    if(!this.props.instruments || !this.props.teachers || !this.props.students || !this.props.lessonPeriod) {
      return (<Loading message="Lesson period..." />)
    }

    // ** Get Related Data ** (serialize to eliminate block below)
    var lessonPeriod = this.props.lessonPeriod;    
    var instrument = this.props.instruments.find((instrument) => {
      return instrument.id === lessonPeriod.instrument_id;
    });
    var teacher = this.props.teachers.find((teacher) => {
      return teacher.id === lessonPeriod.teacher_id;
    });
    var student = this.props.students.find((student) => {
      return student.id === lessonPeriod.student_id;
    });

    // ** Header **
    var editing = this.state.editing ? "editing" : ""
    var headerClasses = "lesson-period-header " + editing;
    var header;

    if(this.state.deleting) {
      header = <LessonPeriodDelete  confirmDelete={this.confirmDelete}
                                    cancelDelete={this.cancelDelete} />
    
    } else if (this.state.editing) {
      header = <FormFields  {...this.props}
                            instrument={instrument}
                            teacher={teacher}
                            student={student}
                            buttonText="Save Student"
                            lessonLengthsEnabled={true}
                            instrumentEnabled={true}
                            teacherEnabled={true}
                            submitEnabled={true}
                            submitLessonPeriodForm={this.handleEditLessonPeriod}
                            handleCancel={this.toggleEditing} />
    } else {
      header = <LessonPeriodHeader  {...this.props}
                                    instrument={instrument}
                                    teacher={teacher}
                                    student={student} 
                                    toggleEditing={this.toggleEditing}
                                    handleDelete={this.handleDelete} />
    }

    // ** Weeks **
    var rawWeeks = this.props.allWeeks[this.props.lessonPeriod.id];
    var weeks = Helper.convertWeeksDatesToJS(rawWeeks);

    return (
      <div className="lesson-period col-sm-6 col-md-4">
        <div className={headerClasses} >
          {header}
        </div>
        <Weeks  {...this.props}
                weeks={weeks}
                teacher={teacher} />
      </div>
    )
  }
});