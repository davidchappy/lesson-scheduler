var Body = React.createClass({
  passLessonCount(count, form) {
    this.props.passLessonCount(count, form);
  },
  render() {
    if ( !this.props.forms ) {
      return (
        <div>
          <p>Loading Forms..</p>
        </div>
      )
    }

    return (
      <div className="body container">
        <AllForms forms={this.props.forms} passLessonCount={this.passLessonCount}/>
      </div>
    )
  }
});