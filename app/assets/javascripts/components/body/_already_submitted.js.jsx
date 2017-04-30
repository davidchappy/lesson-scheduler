var AlreadySubmitted = React.createClass({
  render() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    var submittedAt = new Date(this.props.form.submitted_at);
    var dd = submittedAt.getDate();
    var mm = submittedAt.getMonth();
    var month_name = monthNames[mm];
    var yyyy = submittedAt.getFullYear();
    var submitted_string = month_name + " " + dd + ", " + yyyy;
    var adminEmail = this.props.appSettings.adminEmail;

    return (
      <div className="body container already-submitted">
        <p>Thank you for submitting your form on {submitted_string}. 
            If you need to make further changes, please contact&nbsp;  
             <a href={"mailto:" + adminEmail}>Nathan Arnold</a>.
        </p>
      </div>
    )
  }
});