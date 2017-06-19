var AdminFamilies = React.createClass({

  getInitialState() {
    return {
      orderAttribute: undefined,
      orderDirection: undefined
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

  render() {
    var families = this.props.families.map((family) => {
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
                            students={students} />);
    })

    return(
      <div role="tabpanel" className="tab-pane" id="families">
        <div className="col-xs-10 col-xs-offset-1">
          <h1>All Registered Families</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th onClick={this.sortFamilies.bind(this, "last_name")}
                      className={this.sortBy("last_name")}>Last Name</th>
                  <th onClick={this.sortFamilies.bind(this, "student_count")}
                      className={this.sortBy("student_count")}># of Students</th>
                  <th>Active Codes</th>
                  <th onClick={this.sortFamilies.bind(this, "submitted_at")}
                      className={this.sortBy("submitted_at")}>Last Submitted</th>
                  <th onClick={this.sortFamilies.bind(this, "submission_count")}
                      className={this.sortBy("submission_count")}>Submissions</th>
                  <th onClick={this.sortFamilies.bind(this, "last_seen")}
                      className={this.sortBy("last_seen")}>Last Seen</th>
                  <th></th>
                  <th></th>
                </tr>
                {families}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

});