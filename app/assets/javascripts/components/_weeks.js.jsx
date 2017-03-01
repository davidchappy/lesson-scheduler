var Weeks = React.createClass({
  getInitialState() {
    return { weeks: undefined }
  },
  componentDidMount() {
    var id = this.props.lessonPeriodId;
    $.ajax({
      url: `/api/v1/weeks.json?lesson_period_id=${id}`, 
      type: 'GET',
      success: (response) => {
        var weeks = response;
        weeks.forEach((week, index) => {
          var start_date = new Date(week.start_date);
          var end_date = new Date(week.end_date);
          weeks[index].start_date = start_date;
          weeks[index].end_date = end_date;
        }); 
        this.setState({ weeks: weeks })
        this.props.getLessonCount(weeks);
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
  isUnavailable(week) {
    var dates = this.props.unavailableDates;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        if(week.start_date <= dates[i] && week.end_date >= dates[i]) {
          console.log("isUnavailable");
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
      var unavailable = this.isUnavailable(week) ? true : false;

      return (
        <Week key={week.id} week={week} index={index} 
              handleClick={this.updateWeek} unavailable={unavailable}/>
      )
    });

    // console.log(weeks)

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})