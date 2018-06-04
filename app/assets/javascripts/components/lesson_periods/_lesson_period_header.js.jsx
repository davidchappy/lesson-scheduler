var LessonPeriodHeader = React.createClass({
  render() {
    return (
      <div>
        <h3>{this.props.student.name}</h3>
        <p className="instrument">{this.props.instrument.name}</p>
        <p className="teacher">{this.props.teacher && this.props.teacher.first_name} {this.props.teacher && this.props.teacher.last_name}</p>
        <p className="lesson-count"><strong>{this.props.lessonPeriod.lesson_count}</strong> Lessons</p>
        <div className="lesson-period-hover-menu">
          <span className="edit-lesson-period glyphicon glyphicon-pencil" title="Edit" onClick={this.props.toggleEditing}></span>
          <span className="delete-lesson-period glyphicon glyphicon-remove" title="Delete" onClick={this.props.handleDelete}></span>
        </div>
      </div>
    )
  }
});
