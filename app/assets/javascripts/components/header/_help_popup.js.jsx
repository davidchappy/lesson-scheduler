var HelpPopup = React.createClass({
  render() {
    return (
      <div id='pup-Help'>
        <p>Questions? <br /><a href={"mailto:" + this.props.appSettings.adminEmail.value}>Email us</a>  
           &nbsp;or call {this.props.appSettings.adminPhone.value}</p>
      </div>
    )
  }
})