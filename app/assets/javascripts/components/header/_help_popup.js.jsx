var HelpPopup = React.createClass({
  render() {
    return (
      <div id='pup-Help'>
        <p>Questions? <br /><a href={"mailto:" + appSettings.adminEmail.value}>Email us</a>  
           &nbsp;or call {appSettings.adminPhone.value}</p>
      </div>
    )
  }
})