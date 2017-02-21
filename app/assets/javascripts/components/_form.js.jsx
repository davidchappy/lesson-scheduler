var Form = React.createClass({
  getInitialState() {
    return {  studentName: undefined, lesson_count: undefined, 
              instrument: undefined, teacher: undefined,  
              deleting: false, editing: false,
              unavailableDates: [] }
  },
  componentDidMount() {
    var id = this.props.form.id;

    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'GET',
      success: (response) => { 
        var dates = response[3];
        var unavailableDates = [];
        dates.forEach((date, index) => {
          unavailableDates.push(new Date(date));
        });
        this.setState({ instrument: response[0], teacher: response[1], 
                          studentName: response[2].student_name,
                          unavailableDates: unavailableDates });
      }
    });
  },
  getLessonCount(weeks) {
    var count = 0;
    weeks.map((week) => {
      week.lesson ? count += 1 : count += 0;
    });
    this.setState({lesson_count: count});
    this.props.updateLessonCount(count, this.props.form);
  },
  changeLessonCount(change) {
    var newCount = this.state.lesson_count + change;
    this.setState({ lesson_count: newCount })
    this.props.updateLessonCount(newCount, this.props.form);
  },
  showEdit() {
    this.setState({ editing: true })
  },
  handleEdit(name, instrumentId, teacherId) {
    this.props.handleEdit(name, instrumentId, teacherId, this.props.form);
  },
  confirmDelete() {
    this.props.handleDelete(this.props.form);
  },
  cancelDelete() {
    this.setState({ deleting: false });
  },
  handleDelete() {
    this.setState({ deleting: true });
  },
  render() {
    if ( !this.state.instrument ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var header 
    if(this.state.deleting) {
      header = 
        <div className="form-delete-confirm-wrapper">
          <div className="form-delete-confirm">
            <h3>You sure?</h3>
            <div>
              <button className="btn btn-danger" onClick={this.confirmDelete}>Yes</button>
              <button className="btn btn-default" onClick={this.cancelDelete}>Oops!</button>
            </div>
          </div>
        </div>
    } else if (this.state.editing) {
      var buttonText = "Save Student"
      header = 
        <FormFields handleSubmit={this.handleEdit}
              instruments={this.props.instruments}
              teachers={this.props.teachers}
              buttonText={buttonText} 
              studentName={this.state.studentName}
              instrumentId={this.state.instrument.id}
              teacherId={this.state.teacher.id} />
    } else {
      header = 
        <div>
          <h3>{this.props.form.student_name}</h3>
          <p className="instrument">{this.state.instrument.name}</p>
          <p className="teacher">{this.state.teacher.first_name} {this.state.teacher.last_name}</p>
          <p className="lesson-count"><strong>{this.state.lesson_count}</strong> Lessons</p>
          <div className="form-hover-menu">
            <span className="edit-form glyphicon glyphicon-pencil" title="Edit" onClick={this.showEdit}></span> 
            <span className="delete-form glyphicon glyphicon-remove" title="Delete" onClick={this.handleDelete}></span> 
          </div>
        </div>
    }

    return (
      <div className="form col-sm-6 col-md-4">
        <div className="form-header">
          {header}
        </div>
        <Weeks  form_id={this.props.form.id} 
                getLessonCount={this.getLessonCount} 
                changeLessonCount={this.changeLessonCount}
                unavailableDates={this.state.unavailableDates} />
      </div>
    )
  }
});