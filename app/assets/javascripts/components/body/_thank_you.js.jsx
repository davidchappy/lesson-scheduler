var ThankYou = React.createClass({

  reloadApp() {
    location.reload();
  },

  render() {
    return ( 
      <div className='confirmation-page col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3'> 
        <div className='confirmation-text'>
          <p>Thank you for submitting your summer schedule. 
          If you need to make changes, your schedule will remain editable until May 20th (simply login again, make changes and submit to confirm the changes).</p>
          <p>We’ll see you at lessons and look forward to some good progress this summer!</p>
        </div>
        <div>
          <button className="btn btn-primary" onClick={this.reloadApp}>Return to Your Schedule</button>
        </div>
      </div>
    )
  }
  
});