var LessonPeriodDelete = React.createClass({
  render() {
    return (
      <div className="lesson-period-delete-confirm-wrapper">
        <div className="lesson-period-delete-confirm">
          <h3>You sure?</h3>
          <div>
            <button className="btn btn-danger" onClick={this.props.confirmDelete}>Yes</button>
            <button className="btn btn-default" onClick={this.props.cancelDelete}>Oops!</button>
          </div>
        </div>
      </div>
    )
  }
});
