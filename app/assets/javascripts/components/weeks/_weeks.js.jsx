var Weeks = React.createClass({
  render() {
    if ( !this.props.weeks ) {
      return (<Loading message="Weeks.." />)
    };
    
    var weeks = this.props.weeks.map((week, index) => {
      // check week status: unavailable and/or disabled
      var unavailable = Helper.isUnavailable(week, this.props.teacher.unavailable_weeks);
      var disabledSelect = this.props.lessonPeriod.locked && week.lesson ? true : false;

      return (
        <Week key={week.id} 
              week={week}
              {...this.props} 
              unavailable={unavailable}
              disabledSelect={disabledSelect} />
      )
    });

    return (
      <div className="weeks">{weeks}</div>
    )
  }
})