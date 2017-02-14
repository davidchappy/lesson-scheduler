var Header = React.createClass({
  getInitialState() {
    return { response: undefined }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/forms.json', 
      type: 'GET',
      success: (response) => { 
        console.log('Success');
        this.setState({ items: response }); 
      }
    });
  },
  render() {
    if ( !this.state.response ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    if ( !this.state.response.length === 0 ) {
      return (
        <div>
          <p>No matches!</p>
        </div>
      )
    }

    // console.log(this.state.items);
    var family = this.state.forms[0];
    // var summer = this.state.forms[1];
    // var forms = this.state.forms[2];
    // var weeks = this.state.forms[3].map((week) => {
    //   return (
    //     <div>
    //       <h3>Week {week[0]}</h3>
    //       <p>{week[1]}</p>
    //     </div>
    //   )
    // });
    return (
      <div>
        <h1>The {family.last_name} Family</h1>
        <p></p>
      </div>
    )
  }
});