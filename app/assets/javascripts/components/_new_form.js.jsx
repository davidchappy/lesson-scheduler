var NewForm = React.createClass({
  handleSubmit(name, instrumentId, teacherId) {
    $.ajax({
      url: '/api/v1/forms.json', 
      type: 'POST',
      data: { form: { student_name: name, instrument_id: instrumentId, teacher_id: teacherId } },
      success: (form) => { 
        console.log(form);
        this.props.handleSubmit(form);
      }
    });
  },
  render() {
    var buttonText = "Add Student";
    return (
      <div className="form col-sm-6 col-md-4">
        <div className="form-header">
          <FormFields handleSubmit={this.handleSubmit}
                      instruments={this.props.instruments}
                      teachers={this.props.teachers} 
                      buttonText={buttonText}/>
        </div>
      </div>
    )
  }
});