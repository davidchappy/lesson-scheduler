var Weeks = React.createClass({
  getInitialState() {
    return { weeks: undefined };
  },
  componentWillReceiveProps(nextProps) {
    this.updateStateFromProps(nextProps);
  },
  componentDidMount() {
    this.updateStateFromProps(this.props);  
  },
  updateStateFromProps(props) {
    // Choose this set of weeks from the weeks hash
    var id = props.lessonPeriodId;
    var weeks = props.allWeeks[id];

    // Convert each date into a JS date
    weeks.forEach((week, index) => {
      var start_date = new Date(week.start_date);
      var end_date = new Date(week.end_date);
      weeks[index].start_date = start_date;
      weeks[index].end_date = end_date;
    }); 

    if (this.isMounted()) {
      this.setState({ weeks: weeks });
    }
  },
  putUpdateWeek(week) {
    this.props.updateFromWeekChange(week);
    $.ajax({
      url: `/api/v1/weeks/${week.id}.json`,
      type: 'PUT',
      data: { week: { lesson: week.lesson, lesson_length: week.lesson_length } },
    })
  },
  isUnavailable(week) {
    var dates = this.props.unavailableDates;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        if(week.start_date <= dates[i] && week.end_date >= dates[i]) {
          return true;
        }
      };
    }
    return false;
  },
  render() {
    if ( !this.state.weeks ) {
      return (
        <div>
          <p>Loading Weeks...</p>
        </div>
      )
    };
    
    var weeks = this.state.weeks.map((week, index) => {
      // check if this week includes one of this teacher's unavailable dates
      var unavailable = this.isUnavailable(week);

      return (
        <Week key={week.id} 
              week={week}
              updateFromWeekChange={this.putUpdateWeek} 
              unavailable={unavailable} />
      )
    });

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})