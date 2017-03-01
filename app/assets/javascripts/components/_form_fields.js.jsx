var FormFields = React.createClass({
  getInitialState() {
    var studentName = this.props.studentName ? this.props.studentName : undefined;
    var instrumentId = this.props.instrumentId ? this.props.instrumentId : undefined;
    var teacherId = this.props.teacherId ? this.props.teacherId : undefined;
    var instrumentEnabled = studentName ? true : false;
    var teacherEnabled = instrumentEnabled ? true : false;
    var submitEnabled = teacherEnabled ? true : false;

    return {  studentName: studentName, 
              instrumentId: instrumentId, 
              teacherId: teacherId,
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
  passValues() {
    var name = this.state.studentName;
    var instrumentId = this.state.instrumentId;
    var teacherId = this.state.teacherId;
    this.props.handleSubmit(name, instrumentId, teacherId);
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

    var instrumentEnabled = this.state.instrumentEnabled ? false : true 
    var teacherEnabled = this.state.teacherEnabled ? false : true 
    var submitEnabled = this.state.submitEnabled ? false : true 

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
        <button className="btn btn-success submit-new-lesson-period" id="submit-new-lesson-period"
        disabled={ submitEnabled } onClick={this.passValues}>{this.props.buttonText}</button>
      </form>
    )
  }
})


    

