var Header = React.createClass({
  getInitialState() {
    return { family: undefined, forms: [] }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/forms.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response[0], forms: response[1] }); 
        console.log(response);
        console.log(this.state.family);
        console.log(this.state.forms);
      }
    });
  },
  render() {
    if ( !this.state.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.state.family;
    console.log(family);
    var forms = this.state.forms;
    console.log(forms);
    return (
      <div>
        <h1>The {family.last_name} Family</h1>
        <p></p>
      </div>
    )
  }
});