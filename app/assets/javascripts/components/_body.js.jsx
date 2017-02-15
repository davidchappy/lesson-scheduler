var Body = React.createClass({
  getInitialState() {
    return { forms: undefined }
  },
  passLessonCount(count) {
    this.props.passLessonCount(count);
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/forms.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ forms: response });
      }
    });
  },
  render() {
    if ( !this.state.forms ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div className="body container">
        <AllForms forms={this.state.forms} passLessonCount={this.passLessonCount}/>
      </div>
    )
  }
});