var NewLessonPeriod = React.createClass({
  render() {
    var buttonText = "Add Lesson Period";
    return (
      <div className="lesson-period col-sm-6 col-md-4" >
        <div className="lesson-period-header">
          <FormFields {...this.props}
                      buttonText={buttonText}
                      submitLessonPeriodForm={this.props.createLessonPeriod} />
          <button className="btn btn-danger cancel-new-lesson-period" id="cancel-new-lesson-period" onClick={this.props.toggleCreating}>Cancel</button>            
        </div>
      </div>
    )
  }
});