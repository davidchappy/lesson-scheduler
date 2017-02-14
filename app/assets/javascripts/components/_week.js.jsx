var Week = React.createClass({
  formatDate(date) {
    var string = "";
    var date_array = date.split('-');
    var year = date_array[0];
    var month = date_array[1];
    var day = date_array[2];

  },
  render() {
    var week = this.props.week;
    var weekString = week.week_string;
    var className = week.lesson ? "lesson" : "";
    return (
      <p className={"week " + className}>{weekString}</p>
    )
  }
});