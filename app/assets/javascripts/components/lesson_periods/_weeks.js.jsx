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
    var id = props.lessonPeriod.id;
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
  isUnavailable(week) {
    var dates = this.props.unavailableWeeks;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        // http://stackoverflow.com/questions/15141762/how-to-initialize-javascript-date-to-a-particular-timezone
        var unav_start_date = new Date(dates[i].start_date).toLocaleString("en-US", {timeZone: "America/New_York"})
        var week_date = week.start_date.toLocaleString("en-US", {timeZone: "America/New_York"})
        if(unav_start_date === week_date) {
          console.log("FOUND A MATCH", unav_start_date);
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

      var disabledSelect = false;
      if(this.props.locked && week.lesson) {
        var disabledSelect = true;
      }

      return (
        <Week appSettings={this.props.appSettings}
              key={week.id} 
              week={week}
              unavailable={unavailable}
              disabledSelect={disabledSelect}
              updateFromWeekChange={this.props.putUpdateWeek} />
      )
    });

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})