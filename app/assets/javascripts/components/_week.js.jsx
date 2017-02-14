var Week = React.createClass({
  render() {
    var week = this.props.week;
    var weekNumber = this.props.index + 1;
    var startDate = week.start_date;
    var endDate = week.end_date;
    var className = week.lesson ? "lesson" : "";
    return (
      <p className={"week " + className}>Week {weekNumber}: {startDate} - {endDate}</p>
    )
  }
});