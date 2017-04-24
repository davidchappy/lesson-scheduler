var AdminTeachers = React.createClass({
  render() {
    var teachers = this.props.teachers.map((teacher) => {
      return (<AdminTeacher key={teacher.id}
                            teacher={teacher} />);
    })

    return(
      <div role="tabpanel" className="tab-pane" id="teachers">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>All DMS Teachers</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Teacher Name</th>
                  <th>Instruments</th>
                  <th></th>
                </tr>
                {teachers}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

});