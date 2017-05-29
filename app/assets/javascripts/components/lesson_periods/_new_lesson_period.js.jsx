var NewLessonPeriod = React.createClass({
  render() {
    var buttonText = "Add Student";

    return (
      <div className="lesson-period col-sm-6 col-md-4">
        <div className="lesson-period-header">
          <FormFields {...this.props}
                      buttonText={buttonText}
                      submitLessonPeriodForm={this.props.createLessonPeriod}
                      handleCancel={this.props.toggleCreating} />
        </div>
      </div>
    )
  }
});