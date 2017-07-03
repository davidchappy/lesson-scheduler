var AdminFamilies = React.createClass({

  getInitialState() {
    return {
      orderAttribute: undefined,
      orderDirection: undefined,
      resetting: false,
      familyDetails: undefined
    }
  },

  sortFamilies(attribute) {
    var subset = null;
    if(attribute == "submission_count" ||
       attribute == "submitted_at" ||
       attribute == "student_count") {
      subset = "forms";
    }
    var direction = this.state.orderDirection === "ascending" ? "descending" : "ascending";
    this.setState( {orderAttribute: attribute, orderDirection: direction} );
    this.props.sortByAttribute("families", attribute, direction, subset);
  },

  sortBy(value) {
    if(value === this.state.orderAttribute) {
      return 'sortable ordering ' + this.state.orderDirection;
    } else {
      return 'sortable';
    }
  },

  toggleResetting(e) {
    e.preventDefault();
    this.setState({ resetting: !this.state.resetting });
  },

  handleResetApp(e) {
    e.preventDefault();
    this.setState({ resetting: false });
    this.props.resetApp();
  },

  viewFamilyDetails(family) {
    this.setState({ familyDetails: family });
  },

  turnOffDetails(e) {
    e.preventDefault();
    this.setState({ familyDetails: undefined });  
  },

  render() {

    var families = this.props.families.map((family, index) => {
      var students = this.props.students.map((student) => {
        if(student.family_id === family.id) {
          return student;
        } else {
          return null;
        }
      }).clean(null);

      return (<AdminFamily  key={family.id}
                            {...this.props}
                            family={family} 
                            students={students}
                            index={index}
                            viewFamilyDetails={this.viewFamilyDetails}
                            turnOffDetails={this.turnOffDetails}
                            familyDetails={this.state.familyDetails} />)
    });

    var reset = () => {
      if(this.state.resetting) {
        return (
          <div className="admin-app-reset">
            <p>Are you sure you want to reset all lesson and pricing data?<br/>(Familes, students, teachers, and instruments are preserved)</p>
            <div className="actions">
              <a className="btn btn-danger" href="#" onClick={this.handleResetApp}>Yes</a>&nbsp;&nbsp;
              <a className="btn btn-default" href="#" onClick={this.toggleResetting}>Oops!</a>
            </div>
          </div>
        )
      } else {
        return (
          <div className="admin-app-reset">
            <a className="btn btn-large btn-danger admin-large-button" 
                    href="#" onClick={this.toggleResetting}>Reset App</a>
          </div>
        )
      }
    };

    return (
      <div role="tabpanel" className="tab-pane" id="families">
        <div className="col-xs-10 col-xs-offset-1">
          <h1>All Registered Families</h1> 
          {reset()}
        
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th onClick={this.sortFamilies.bind(this, "last_name")}
                      className={this.sortBy("last_name")}>Last Name</th>
                  <th onClick={this.sortFamilies.bind(this, "student_count")}
                      className={this.sortBy("student_count")}># Lesson Periods</th>
                  <th onClick={this.sortFamilies.bind(this, "submitted_at")}
                      className={this.sortBy("submitted_at")}>Last Submitted</th>
                  <th onClick={this.sortFamilies.bind(this, "submission_count")}
                      className={this.sortBy("submission_count")}>Submissions</th>
                  <th onClick={this.sortFamilies.bind(this, "last_seen")}
                      className={this.sortBy("last_seen")}>Last Seen</th>
                  <th></th>
                  <th></th>
                  <th></th>
                </tr>
                {families}
              </tbody>
            </table>
          </div>
          </div>
      </div>
    );
  }

});