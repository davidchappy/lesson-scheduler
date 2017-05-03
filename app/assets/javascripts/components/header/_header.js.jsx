var Header = React.createClass({

  render() {
    if ( !this.props.family || !this.props.appSettings || !this.props.lessonPeriods || !this.props.allWeeks) {
      return (<Loading message="Header"/>)
    }

    return (
      <div className="navbar navbar-inverse navbar-fixed-top header">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">The {this.props.family.last_name} Family</a>
            { this.props.admin 
                ? <ReturnToAdmin /> 
                : this.props.hasSubmitted ? null :
                    <button className="btn add-lesson-period" onClick={this.props.toggleCreating}>
                      <span className="glyphicon glyphicon-plus"></span>
                    </button>
            }
          </div>
          {
            this.props.form.submitted && new Date() > new Date(this.props.appSettings["submissionDeadline"].value)
            ? <div id="navbar" className="navbar-collapse collapse"></div> 
            : <Dashboard  {...this.props} />
          }
        </div>
      </div>
    )
  }
  
});