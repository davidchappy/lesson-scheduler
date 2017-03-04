var FormFields = React.createClass({
  getInitialState() {
    var studentName = this.props.studentName ? this.props.studentName : undefined;
    var instrumentId = this.props.instrumentId ? this.props.instrumentId : undefined;
    var teacherId = this.props.teacherId ? this.props.teacherId : undefined;
    var defaultLessonLength = this.props.lessonPeriod ? 
                              this.props.lessonPeriod.default_lesson_length : undefined;
    var instrumentEnabled = studentName ? true : false;
    var teacherEnabled = instrumentEnabled ? true : false;
    var submitEnabled = teacherEnabled ? true : false;

    return  {  
              studentName: studentName, 
              instrumentId: instrumentId, 
              teacherId: teacherId,
              defaultLessonLength: defaultLessonLength,
              instrumentEnabled: instrumentEnabled,
              teacherEnabled: teacherEnabled,
              submitEnabled: submitEnabled  
            }
  },
  handleTypeName(event) {
    var name = event.target.value;
    this.setState({ studentName: name, instrumentEnabled: true });
  },
  handleInstrumentSelect(event) {
    var instrumentId = event.target.value;
    this.setState({ instrumentId: instrumentId, teacherEnabled: true });
  },  
  handleTeacherSelect(event) {
    var teacherId = event.target.value;
    this.setState({ teacherId: teacherId, submitEnabled: true });
  },
  handleDefaultLessonLength(event) {
    var defaultLessonLength = event.target.value;
    this.setState({ defaultLessonLength: event.target.value });
  },
  lessonLengthOptions() {
    return [30, 45, 60, 75, 90, 105, 120];
  },
  passValues(event) {
    event.preventDefault();
    var name = this.state.studentName;
    var instrumentId = this.state.instrumentId;
    var teacherId = this.state.teacherId;
    var defaultLessonLength = this.state.defaultLessonLength;
    this.props.handleSubmit(name, instrumentId, teacherId, defaultLessonLength);
  },
  formatDuration(timeInMinutes) {      
    var hours = Math.floor(Math.abs(timeInMinutes) / 60);  
    var minutes = Math.abs(timeInMinutes) % 60; 

    var string = "";
    string += hours > 0 ? hours + 'h ' : ''
    string += minutes + 'm' 
      
    return string;  
  },
  render() {
    var instruments = this.props.instruments.map((instrument) => {
      return (
        <option value={instrument.id} key={instrument.id} className="instrument">{instrument.name}</option>
      )
    });

    var teachers = this.props.teachers.map((teacher) => {
      if(teacher.id == this.state.instrumentId) { 
        return (
          <option value={teacher.id} key={teacher.id} className="instrument">{teacher.first_name} {teacher.last_name}</option>
        )
      }
    });

    var lessonLengths = this.lessonLengthOptions().map((length, index) => {
      var lessonLengthString = this.formatDuration(length);
      return (
        <option value={length} key={index}>{lessonLengthString}</option>
      )
    })

    var defaultLessonLength = () => {
        return  <select ref="selectDefaultLessonLength" className="lesson-length"
                  onChange={this.handleDefaultLessonLength} required 
                  defaultValue={this.state.defaultLessonLength}>
                  {lessonLengths}
                </select>;
    }

    var instrumentEnabled = this.state.instrumentEnabled ? false : true;
    var teacherEnabled = this.state.teacherEnabled ? false : true;
    var submitEnabled = this.state.submitEnabled ? false : true;

    return (
      <form className="new-lesson-period-form form-inline">
        <input ref="studentName" type="text" className="form-control studentName" id="studentName" 
          placeholder="Student's name" onKeyUp={this.handleTypeName} defaultValue={this.state.studentName} required/>
        <select ref="selectTeacher" className="form-control selectTeacher" id="selectTeacher"
          onChange={this.handleTeacherSelect}   
          disabled={ teacherEnabled } required value={this.state.teacherId}>
            <option value='' className="placeholder">Teacher</option>
            {teachers}
        </select>
        <select ref="selectInstrument" className="form-control selectInstrument" id="selectInstrument" 
          onChange={this.handleInstrumentSelect}  
          disabled={ instrumentEnabled } required value={this.state.instrumentId}>
            <option value='' className="placeholder">Instrument</option>
            {instruments}
        </select>
        <div className="default-lesson-length">{defaultLessonLength()}&nbsp;Lessons</div>
        <button className="btn btn-primary submit-new-lesson-period" id="submit-new-lesson-period"
        disabled={ submitEnabled } onClick={this.passValues}>{this.props.buttonText}</button>
      </form>
    )
  }
})


    

