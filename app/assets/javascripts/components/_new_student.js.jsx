var NewStudent = React.createClass({
  handleSubmit(name, instrumentId, teacherId) {
    var formId = this.props.form.id;
    $.ajax({
      url: '/api/v1/students.json', 
      type: 'POST',
      data: { student: { student_name: name, instrument_id: instrumentId, teacher_id: teacherId, form_id: formId  } },
      success: (student) => { 
        console.log(student);
        this.props.handleSubmit(student);
      }
    });
  },
  render() {
    var buttonText = "Add Student";
    return (
      <div className="student col-sm-6 col-md-4">
        <div className="student-header">
          <FormFields handleSubmit={this.handleSubmit}
                      instruments={this.props.instruments}
                      teachers={this.props.teachers} 
                      buttonText={buttonText}/>
        </div>
      </div>
    )
  }
});