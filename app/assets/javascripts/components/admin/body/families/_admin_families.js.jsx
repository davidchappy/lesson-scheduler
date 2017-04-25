var AdminFamilies = React.createClass({
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
                            family={family} 
                            students={students} />);
    })

    return(
      <div role="tabpanel" className="tab-pane" id="families">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>All Registered Families</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Last Name</th>
                  <th># of Students</th>
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