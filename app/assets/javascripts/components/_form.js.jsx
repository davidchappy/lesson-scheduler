var Form = React.createClass({
  getInitialState() {
    return { instrument: undefined, teacher: undefined }
  },
  componentDidMount() {
    var id = this.props.form.id;
    // console.log("Form id: " + id);
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'GET',
      success: (response) => { 
        this.setState({ instrument: response[0], teacher: response[1] });
      }
    });
  },
  render() {
    if ( !this.state.instrument ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }
    return (
      <div className="form">
        <div className="form-header">
          <h3>{this.props.form.student_name}</h3>
          <p>Instrument: {this.state.instrument.name}</p>
          <p>Teacher: {this.state.teacher.first_name} {this.state.teacher.last_name}</p>
        </div>
        <Weeks form_id={this.props.form.id} />
      </div>
    )
  }
});