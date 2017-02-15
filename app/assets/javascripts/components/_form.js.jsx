var Form = React.createClass({
  getInitialState() {
    return { instrument: undefined, teacher: undefined, lesson_count: undefined }
  },
  componentDidMount() {
    var id = this.props.form.id;
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ instrument: response[0], teacher: response[1] });
      }
    });
  },
  getLessonCount(weeks) {
    var count = 0;
    weeks.map((week) => {
      week.lesson ? count += 1 : count += 0;
    });
    this.setState({lesson_count: count});
    this.props.updateLessonCount(count);
  },
  changeLessonCount(change) {
    var newCount = this.state.lesson_count + change;
    this.setState({ lesson_count: newCount })
    this.props.updateLessonCount(change);
  },
  render() {
    if ( !this.state.instrument ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div className="form col-sm-6 col-md-4">
        <div className="form-header">
          <h3>{this.props.form.student_name}</h3>
          <p className="instrument">{this.state.instrument.name}</p>
          <p className="teacher">{this.state.teacher.first_name} {this.state.teacher.last_name}</p>
          <p className="lesson-count"><strong>{this.state.lesson_count}</strong> Lessons</p>
        </div>
        <Weeks form_id={this.props.form.id} getLessonCount={this.getLessonCount} changeLessonCount={this.changeLessonCount}/>
      </div>
    )
  }
});