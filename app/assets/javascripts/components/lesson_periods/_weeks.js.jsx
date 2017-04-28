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
  putUpdateWeek(week) {
    $.ajax({
      url: `/api/v1/weeks/${week.id}.json`,
      type: 'PUT',
      data: { week: { lesson: week.lesson, lesson_length: week.lesson_length } },
      success: (response) => {
        this.props.updateFromWeekChange(response);
        if(this.isAtLessonMinimum(week.lesson_length)) {
          this.props.lockLessons();
        } else {
          this.props.unlockLessons();
        }
      }
    });
  },
  isUnavailable(week) {
    var dates = this.props.unavailableDates;
    if(dates.length > 0) {
      for(i=0; i < dates.length; i++) {
        var date = new Date(dates[i]);
        if(week.start_date <= date && week.end_date >= date) {
          return true;
        }
      };
    }
    return false;
  },
  isAtLessonMinimum(lessonLength) {
    var defaultLessonLength = this.props.lessonPeriod.default_lesson_length;
    var requiredMinutes = defaultLessonLength * 7;
    var currentLessonMinutes = Helper.getLessonMinutesFromWeeks(this.state.weeks);
    if(currentLessonMinutes - lessonLength < requiredMinutes) {
      return true;
    } else {
      return false;
    }
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
              updateFromWeekChange={this.putUpdateWeek} 
              unavailable={unavailable}
              isAtLessonMinimum={this.isAtLessonMinimum}
              disabledSelect={disabledSelect} />
      )
    });

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})