var Week = React.createClass({
  render() {
    var week = this.props.week;
    var week_number = this.props.index + 1;
    var start_date = week.start_date;
    var end_date = week.end_date;
    var lesson = week.lesson;
    return (
      <div>
        <p>Week {week_number}: {start_date} - {end_date}</p>
      </div>
    )
  }
});