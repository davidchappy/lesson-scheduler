var Week = React.createClass({
  handleCheckWeek(e) {
    e.preventDefault();
    var week = this.props.week;
    week.lesson = this.props.week.lesson ? false : true;
    this.props.editWeek(week);
  },
  handleSelectLessonLength(e) {
    e.preventDefault();
    var week = this.props.week;
    week.lesson_length = Number(e.target.value);
    this.props.editWeek(week);
  },
  render() {
    var week = this.props.week; 
    var weekNumber = "week" + week.id;
    var selected = this.props.week.lesson ? " selected" : "";
    var disabled = this.props.disabledSelect ? " disabled" : "";
    var inputDisabled = this.props.disabledSelect ? true : false;

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
      "data-tip": this.props.unavailable || this.props.disabledSelect ? "" : null,
      className: "week"
    };

    var idSuffix = this.props.week.id + this.props.week.lesson_period_id;

    if(this.props.unavailable) {
      htmlAttributes["data-for"] = "ttUnavailableMessage" + idSuffix;
      htmlAttributes.className += " unavailable"
    }

    if(this.props.disabledSelect) {
      htmlAttributes["data-for"] = "lockedLesson" + idSuffix;
    }
    
    return (
      <div>
        <div {...htmlAttributes}>
          <span>{week.week_string}</span>
          <div className={"checkbox"}>
            <input  ref='week' id={weekNumber} type="checkbox" 
                    className={"form-control select-week" } 
                    onClick={this.handleCheckWeek} disabled={inputDisabled}></input>
                    <label htmlFor={weekNumber} className={"glyphicon" + selected + disabled}></label>
          </div>
          {lessonLength()}
          {
            this.props.unavailable && !this.props.disabledSelect

              ? <ReactTooltip id={'ttUnavailableMessage'+idSuffix} type='dark' effect='solid' 
                              place='right' className="tt-in-body">
                  <UnavailableMessage />
                </ReactTooltip>
              : null
          }
          {
            this.props.disabledSelect 
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