var FormFields = React.createClass({
  getInitialState() {
    return  {  
              studentName: undefined, 
              instrument: undefined, 
              teacher: undefined,
              defaultLessonLength: undefined,
              lessonLengthsEnabled: false,
              instrumentEnabled: false,
              teacherEnabled: false,
              submitEnabled: false  
            }
  },
  componentWillMount() {
    var studentName = this.props.student ? this.props.student.name : "";
    var lessonLength =  this.props.lessonPeriod ? 
                        this.props.lessonPeriod.default_lesson_length :
                        30;
    this.setState({ 
                    studentName: studentName,
                    instrument: this.props.instrument,
                    teacher: this.props.teacher,
                    defaultLessonLength: lessonLength,
                    lessonLengthsEnabled: this.props.lessonLengthsEnabled,
                    instrumentEnabled: this.props.instrumentEnabled,
                    teacherEnabled: this.props.teacherEnabled,
                    submitEnabled: this.props.submitEnabled 
                  })
  },
  handleStudentName(event) {
    var name = event.target.value;
    var instrumentEnabled = name.length ? true : false;
    this.setState({ studentName: name, instrumentEnabled: instrumentEnabled });
  },
  handleInstrumentSelect(event) {
    var instrumentId = event.target.value;
    var instrument = Helper.findElementInArrayById(instrumentId, this.props.instruments);
    this.setState({ instrument: instrument, teacherEnabled: true });
  },  
  handleTeacherSelect(event) {
    var teacherId = event.target.value;
    var teacher = Helper.findElementInArrayById(teacherId, this.props.teachers);
    this.setState({ teacher: teacher, lessonLengthsEnabled: true, submitEnabled: true });
  },
  handleDefaultLessonLength(event) {
    var defaultLessonLength = event.target.value;
    this.setState({ defaultLessonLength: event.target.value });
  },
  handleSubmitLessonPeriodForm(event) {
    event.preventDefault();
    var name = this.state.studentName;
    var instrumentId = this.state.instrument.id;
    var teacherId = this.state.teacher.id;
    var defaultLessonLength = this.state.defaultLessonLength;
    this.props.submitLessonPeriodForm(name, instrumentId, 
                                            teacherId, defaultLessonLength);
  },
  render() {
    var instrumentEnabled = this.state.instrumentEnabled ? false : true;
    var teacherEnabled = this.state.teacherEnabled ? false : true;
    var submitEnabled = this.state.submitEnabled ? false : true;
    var lessonLengthsEnabled = this.state.lessonLengthsEnabled ? false : true;
    var lessonLengthsClass = this.state.lessonLengthsEnabled ? "" : "disabled";
    var instrumentId = this.state.instrument ? this.state.instrument.id : "";
    var teacherId = this.state.teacher ? this.state.teacher.id : "";

    var students = this.props.students.map((student) => {
      return (
        <option value={student.name} key={student.id} className="student" />
      )
    });

    var instruments = this.props.instruments.map((instrument) => {
      return (
        <option value={instrument.id} key={instrument.id} className="instrument">{instrument.name}</option>
      )
    });

    var teachers = this.props.teachers.map((teacher) => {
      if(this.state.instrument && teacher.id === this.state.instrument.id) { 
        return (
          <option value={teacher.id} key={teacher.id} className="instrument">{teacher.first_name} {teacher.last_name}</option>
        )
      }
    });

    var lessonLengths = appSettings.lessonLengthOptions.map((length, index) => {
      var lessonLengthString = Helper.convertMinutesToHours(length);
      return (
        <option value={length} key={index}>{lessonLengthString}</option>
      )
    })

    var defaultLessonLength = () => {
      return  <select ref="selectDefaultLessonLength" id="default-lesson-length" className="lesson-length"
                onChange={this.handleDefaultLessonLength} required disabled={lessonLengthsEnabled}
                defaultValue={this.state.defaultLessonLength}>
                {lessonLengths}
              </select>;
    }

    return (
      <form className="new-lesson-period-form form-inline" id="new-lesson-period-form">
        <input  ref="studentName" type="text" className="form-control studentName" id="studentName" 
                placeholder={this.state.studentName || "Student's name"} required list='selectStudent' 
                onInput={this.handleStudentName} />
        <datalist ref="selectStudent" className="form-control selectStudent" id="selectStudent">
            {students}
        </datalist>
      
        <select ref="selectTeacher" className="form-control selectTeacher" id="selectTeacher"
          onChange={this.handleTeacherSelect}   
          disabled={ teacherEnabled } required defaultValue={teacherId}>
            <option value='' className="placeholder">TEACHER</option>
            {teachers}
        </select>
        <select ref="selectInstrument" className="form-control selectInstrument" id="selectInstrument" 
          onChange={this.handleInstrumentSelect}  
          disabled={ instrumentEnabled } required defaultValue={instrumentId}>
            <option value='' className="placeholder">INSTRUMENT</option>
            {instruments}
        </select>
        <div className={"default-lesson-length " + lessonLengthsClass} >{defaultLessonLength()}&nbsp;Lessons</div>
        <button className="btn btn-primary submit-new-lesson-period" id="submit-new-lesson-period"
        disabled={ submitEnabled } onClick={this.handleSubmitLessonPeriodForm}>{this.props.buttonText}</button>
      </form>
    )
  }
})


    

