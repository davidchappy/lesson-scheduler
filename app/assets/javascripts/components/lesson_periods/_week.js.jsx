var Week = React.createClass({
  getInitialState() {
    return { selected: undefined, lesson_length: undefined, disabledSelect: undefined }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ selected: nextProps.week.lesson, 
                    lesson_length: nextProps.week.lesson_length,
                    disabledSelect: nextProps.disabledSelect });
  },
  componentDidMount() {
    this.setState({ selected: this.props.week.lesson,
                    lesson_length: this.props.week.lesson_length,
                    disabledSelect: this.props.disabledSelect });
  },
  handleCheckWeek(e) {
    e.preventDefault();
    var week = this.props.week;
    week.lesson = this.state.selected ? false : true;
    this.props.updateFromWeekChange(week);
  },
  handleSelectLessonLength(e) {
    e.preventDefault();
    var week = this.props.week;
    week.lesson_length = Number(e.target.value);
    this.props.updateFromWeekChange(week);
  },
  render() {
    var week = this.props.week; 
    var weekNumber = "week" + week.id;
    var selected = this.state.selected ? "selected" : "";
    var unavailable = this.props.unavailable;

    var lessonLengthsArray = this.props.appSettings.lessonLengthOptions.value.split(",");
    var lessonLengths = lessonLengthsArray.map((length, index) => {
      var lessonLengthString = Helper.convertMinutesToHours(length);
      return (
        <option value={length.trim()} key={index}>{lessonLengthString}</option>
      )
    });

    var lessonLength = () => {
      if(week.lesson) {
        return  <select ref="selectLessonLength" className="lesson-length"
                  onChange={this.handleSelectLessonLength} required value={week.lesson_length}>
                  {lessonLengths}
                </select>;
      }
    };

    var htmlAttributes = {
      "data-tip": this.props.unavailable || this.state.disabledSelect ? "" : null,
      className: "week"
    };

    var idSuffix = this.props.week.id + this.props.week.lesson_period_id;

    if(this.props.unavailable) {
      htmlAttributes["data-for"] = "ttUnavailableMessage" + idSuffix;
      htmlAttributes.className += " unavailable"
    }

    if(this.state.disabledSelect) {
      htmlAttributes["data-for"] = "lockedLesson" + idSuffix;
    }
    
    return (
      <div>
        <div {...htmlAttributes}>
          <span>{week.week_string}</span>
          <div className={"checkbox"}>
            <input  ref='week' id={weekNumber} type="checkbox" 
                    className={"form-control select-week glyphicon " + selected} 
                    onClick={this.handleCheckWeek}
                    disabled={this.state.disabledSelect} ></input>
            {lessonLength()}
          </div>
          {
            this.props.unavailable && !this.state.disabledSelect

              ? <ReactTooltip id={'ttUnavailableMessage'+idSuffix} type='dark' effect='solid' 
                              place='right' className="tt-in-body">
                  <UnavailableMessage />
                </ReactTooltip>
              : null
          }
          {
            this.state.disabledSelect 
              ? <ReactTooltip id={'lockedLesson'+idSuffix} type='dark' effect='solid' 
                              place='right' className="tt-in-body">
                  <LockedLesson />
                </ReactTooltip> 
              : null
          }
        </div>
      </div>
    )
  }
});