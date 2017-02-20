var Weeks = React.createClass({
  getInitialState() {
    return { weeks: undefined }
  },
  componentDidMount() {
    var id = this.props.form_id;
    $.ajax({
      url: `/api/v1/weeks.json?form_id=${id}`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ weeks: response });
        this.props.getLessonCount(this.state.weeks);
      }
    });
  },
  updateWeek(week) {
    week.lesson = week.lesson ? false : true;

    $.ajax({
      url: `/api/v1/weeks/${week.id}.json`,
      type: 'PUT',
      data: { week: { lesson: week.lesson } },
      success: () => {
        this.markChecked(week);
      }
    })
  },
  markChecked(week) {
    var weeks = this.state.weeks;
    var index = weeks.indexOf(week);
    weeks[index] = week;
    this.setState({ weeks: weeks });

    var change = week.lesson ? 1 : -1
    this.props.changeLessonCount(change);
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
        <Week key={week.id} week={week} index={index} handleClick={this.updateWeek} />
      )
    });

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})