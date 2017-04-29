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
    var dates = this.props.unavailableDates;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        var date = new Date(dates[i]); // change to var date = new Date(dates[i].value); 
        if(week.start_date <= date && week.end_date >= date) {
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