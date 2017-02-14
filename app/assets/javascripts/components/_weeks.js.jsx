var Weeks = React.createClass({
  getInitialState() {
    return { weeks: undefined, lesson_count:undefined }
  },
  componentDidMount() {
    var id = this.props.form_id;
    $.ajax({
      url: `/api/v1/weeks.json?form_id=${id}`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ weeks: response });
        this.props.updateLessonCount(this.state.weeks);
      }
    });
  },
  render() {
    if ( !this.state.weeks ) {
      return (
        <div>
          <p>Loading Weeks...</p>
        </div>
      )
    }
    var weeks = this.state.weeks.map((week, index) => {
      return (
        <Week key={week.id} week={week} index={index} />
      )
    });
    return (
      <div className="weeks">{weeks}</div>
    )
  }
})