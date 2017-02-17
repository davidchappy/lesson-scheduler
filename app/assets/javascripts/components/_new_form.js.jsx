var NewForm = React.createClass({
  getInitialState() {
    return {  studentName: undefined, 
              instrumentId: undefined, 
              teacherId: undefined,
              instrumentEnabled: false,
              teacherEnabled: false,
              submitEnabled: false  
            }
  },
  handleSubmit() {
    var name = this.state.studentName;
    var instrumentId = this.state.instrumentId;
    var teacherId = this.state.teacherId;

    $.ajax({
      url: '/api/v1/forms.json', 
      type: 'POST',
      data: { form: { student_name: name, instrument_id: instrumentId, teacher_id: teacherId } },
      success: (form) => { 
        console.log("Successful");
      }
    });
  },
  handleTypeName(event) {
    var name = event.target.value;
    console.log("Changing name: " + name);
    this.setState({ studentName: name, instrumentEnabled: true });
  },
  handleInstrumentSelect(event) {
    var instrumentId = event.target.value;
    this.setState({ instrumentId: instrumentId, teacherEnabled: true });
    // handle updating teachers
  },  
  handleTeacherSelect(event) {
    var teacherId = event.target.value;
    this.setState({ teacherId: teacherId, submitEnabled: true });
  },
  render() {
    var instruments = this.props.instruments.map((instrument) => {
      return (
        <option value={instrument.id} key={instrument.id} className="instrument">{instrument.name}</option>
      )
    });

    var teachers = this.props.teachers.map((teacher) => {
      return (
        <option value={teacher.id} key={teacher.id} className="instrument">{teacher.first_name} {teacher.last_name}</option>
      )
    });

    var instrumentEnabled = this.state.instrumentEnabled ? false : true 
    var teacherEnabled = this.state.teacherEnabled ? false : true 
    var submitEnabled = this.state.submitEnabled ? false : true 

    return (
      <div className="form col-sm-6 col-md-4">
        <div className="form-header">
          <form className="new-student-form form-inline">
            <input ref="studentName" type="text" className="form-control" id="studentName" 
              placeholder="Student's first name" onKeyUp={this.handleTypeName} required/>
            <select ref="selectTeacher" className="form-control" id="selectTeacher"
              onChange={this.handleTeacherSelect}   
              disabled={ teacherEnabled } required value={this.state.teacherId}>
                <option disabled selected value>Teacher</option>
                {teachers}
            </select>
            <select ref="selectInstrument" className="form-control" id="selectInstrument" 
              onChange={this.handleInstrumentSelect}  
              disabled={ instrumentEnabled } required value={this.state.instrumentId}>
              <option disabled selected value>Instrument</option>
              {instruments}
            </select>
            <button className="btn btn-success" id="submit-new-student"
            disabled={ submitEnabled } onClick={this.handleSubmit}>Add Student</button>
          </form>
        </div>
      </div>
    )

  }
});