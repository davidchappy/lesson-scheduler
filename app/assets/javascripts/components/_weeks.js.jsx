var Weeks = React.createClass({
  getInitialState() {
    return { weeks: undefined }
  },
  componentDidMount() {
    var id = this.props.form_id;
    console.log(id);
    $.ajax({
      url: `/api/v1/weeks.json?form_id=${id}`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ weeks: response });
      }
    });
  },
  render() {
    if ( !this.state.weeks ) {
      return (
        <div>
          <p>Loading Weeks...</p>
        </div>
      )
    }
    var weeks = this.state.weeks.map((week, index) => {
      return (
        <Week week={week} index={index} />
      )
    });
    return (
      <div className="weeks">{weeks}</div>
    )
  }
})