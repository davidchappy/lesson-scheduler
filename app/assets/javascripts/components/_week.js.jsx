var Week = React.createClass({
  getInitialState() {
    return { selected: true, lesson_length: undefined }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.week.lesson, 
                    lesson_length: nextProps.week.lesson_length });
  },
  componentDidMount() {
    this.setState({ selected: this.props.week.lesson,
                    lesson_length: this.props.week.lesson_length });
  },
  handleCheckWeek(event) {
    week = this.props.week;
    week.lesson = week.lesson ? false : true;
    this.props.updateFromWeekChange(week);
  },
  handleSelectLessonLength(event) {
    week = this.props.week;
    week.lesson_length = event.target.value;
    this.props.updateFromWeekChange(week);
  },
  render() {
    var week = this.props.week; 
    var weekNumber = "week" + week.id;
    var selected = this.state.selected ? "selected" : "";
    var unavailable = this.props.unavailable ? "unavailable" : "";

    var lessonLengths = defaultSettings.lessonLengthOptions.map((length, index) => {
      var lessonLengthString = utils.convertMinutesToHours(length);
      return (
        <option value={length} key={index}>{lessonLengthString}</option>
      )
    })

    var lessonLength = () => {
      if(week.lesson) {
        return  <select ref="selectLessonLength" className="lesson-length"
                  onChange={this.handleSelectLessonLength} required value={week.lesson_length}>
                  {lessonLengths}
                </select>;
      }
    }
    
    return (
      <div className={"week " + unavailable}>
        <span>{week.week_string}</span>
        <div className={"checkbox"}>
          <input  ref='week' id={weekNumber} type="checkbox" 
                  className={"form-control select-week " + selected} 
                  onClick={this.handleCheckWeek}></input>
          {lessonLength()}
        </div>
        
      </div>
    )
  }
});