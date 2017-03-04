var AlreadySubmitted = React.createClass({
  render() {
    var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
    var submitted_at = new Date(this.props.submitted_at);
    var dd = submitted_at.getDate();
    var mm = submitted_at.getMonth();
    var month_name = monthNames[mm];
    var yyyy = submitted_at.getFullYear();
    var submitted_string = month_name + " " + dd + ", " + yyyy;

    return (
      <div className="body container already-submitted">
        <p>Thank you for submitting your form on {submitted_string}. 
            If you need to make further changes, please contact&nbsp;  
             <a href="mailto:nja@dmusicstudios.com">Nathan Arnold</a>.
        </p>
      </div>
    )
  }
});