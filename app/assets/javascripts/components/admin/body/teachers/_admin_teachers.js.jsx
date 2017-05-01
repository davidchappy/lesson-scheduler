var AdminTeachers = React.createClass({
  render() {
    var teachers = this.props.teachers.map((teacher) => {
      return (<AdminTeacher key={teacher.id}
                            teacher={teacher}
                            {...this.props} />);
    })

    return(
      <div role="tabpanel" className="tab-pane" id="teachers">
        <div className="col-sm-10 col-sm-offset-1">
          <h1>All DMS Teachers</h1>
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Teacher Name</th>
                  <th>Instruments</th>
                  <th>Unavailable</th>
                  <th></th>
                </tr>
                {teachers}
              </tbody>
            </table>
          </div>
          <SimpleForm handleSubmit={this.props.createTeacher}
                      placeholderText="New Teacher"
                      inputClass="admin-new-item-input"
                      btnClass="submit-form-button"
                      btnText="Add Teacher"
                      id="addTeacher" />
        </div>
      </div>
    )
  }

});