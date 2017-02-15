var Week = React.createClass({
  formatDate(date) {
    var string = "";
    var date_array = date.split('-');
    var year = date_array[0];
    var month = date_array[1];
    var day = date_array[2];
  },
  handleClick() {
    this.props.handleClick(this.props.week);
  },
  render() {
    var week = this.props.week; 
    var weekNumber = "week" + week.id;
    var selected = week.lesson ? "selected" : "";
    return (
      <div className={"week"}>
        <span>{week.week_string}</span>
        <div className={"form-group"}>
          <input ref='week' id={weekNumber} type="checkbox" className={"form-control select-week " + selected} onChange={this.handleClick}></input>
        </div>
      </div>
    )
  }
});