var Week = React.createClass({
  // formatDate(date) {
  //   var string = "";
  //   var date_array = date.split('-');
  //   var year = date_array[0];
  //   var month = date_array[1];
  //   var day = date_array[2];
  // },
  handleClick() {
    this.props.handleClick(this.props.week, true);
  },
  handleLessonLengthChange(event) {
    console.log(event.target.value);
    week = this.props.week;
    week.lesson_length = event.target.value;
    this.props.handleClick(week);
  },
  formatDuration(timeInMinutes) {      
    var hours = Math.floor(Math.abs(timeInMinutes) / 60);  
    var minutes = Math.abs(timeInMinutes) % 60; 

    var string = "";
    string += hours > 0 ? hours + 'h ' : ''
    string += minutes + 'm' 
      
    return string;  
  },
  lessonLengthOptions() {
    return [30, 45, 60, 75, 90, 105, 120];
  },
  render() {
    var week = this.props.week; 
    var weekNumber = "week" + week.id;
    var selected = week.lesson ? "selected" : "";
    var unavailable = this.props.unavailable ? "unavailable" : "";

    var lessonLengths = this.lessonLengthOptions().map((length, index) => {
      var lessonLengthString = this.formatDuration(length);
      return (
        <option value={length} key={index}>{lessonLengthString}</option>
      )
    })

    var lessonLength = () => {
      if(week.lesson) {
        return  <select ref="selectLessonLength" className="lesson-length"
                  onChange={this.handleLessonLengthChange} required value={week.lesson_length}>
                  {lessonLengths}
                </select>;
      } else {
        return null;
      }
    }
    
    return (
      <div className={"week " + unavailable}>
        <span>{week.week_string}</span>
        <div className={"checkbox"}>
          <input  ref='week' id={weekNumber} type="checkbox" 
                  className={"form-control select-week " + selected} 
                  onClick={this.handleClick}></input>
          {lessonLength()}
        </div>
        
      </div>
    )
  }
});