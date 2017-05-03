var AdminTeacher = React.createClass({
  getInitialState() {
    return {
      editing: false, deleting: false, 
      addingInstrument: false, updatingUnavailables: false
    }
  },

  handleDelete(e) {
    e.preventDefault();
    this.props.deleteTeacher(this.props.teacher.id);
  },

  toggleEdit(e) {
    e.preventDefault();
    var editing = this.state.editing ? false : true;
    this.setState({ editing: editing });
  },

  handleEdit(submittedName) {
    var names = Helper.processTeacherName(submittedName);
    this.setState({ editing: false });
    var teacher = Helper.clone(this.props.teacher);
    teacher.first_name = names[0];
    teacher.last_name = names[1];
    this.props.updateTeacher(teacher);
  },

  toggleAddInstrument(e) {
    e.preventDefault();
    var addingInstrument = this.state.addingInstrument ? false : true;
    this.setState({ addingInstrument: addingInstrument });
  },

  handleAddInstrumentToTeacher(instrumentId) {
    this.setState({ addingInstrument: false });
    this.props.addInstrumentToTeacher(instrumentId, this.props.teacher)
  },

  handleRemoveInstrumentFromTeacher(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeInstrumentFromTeacher(id, this.props.teacher);
  },

  toggleUnavailableWeeks(e) {
    e.preventDefault();
    var updatingUnavailables = this.state.updatingUnavailables ? false : true;
    this.setState({ updatingUnavailables: updatingUnavailables });
  },

  handleAddUnavailableToTeacher(weeksIndex) {
    console.log("weeksIndex: ", weeksIndex);
    this.setState({ updatingUnavailables: false });
    this.props.addUnavailableToTeacher(weeksIndex, this.props.teacher);
  },

  handleRemoveUnavailableFromTeacher(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeUnavailableFromTeacher(id, this.props.teacher);
  },

  render() {
    var teacher = this.props.teacher;
    if(teacher.instruments && teacher.instruments.length > 0) {
      var instruments = teacher.instruments.map((instrument) => {
        return (
          <li key={instrument.id} className="admin-instrument-list-item">{instrument.name}
            <span data-id={instrument.id} className="glyphicon glyphicon-minus admin-remove-instrument" 
                  onClick={this.handleRemoveInstrumentFromTeacher}>
            </span>
          </li>
        );
      });
    }
    var name = teacher.first_name + " " + teacher.last_name;
    var displayedInstruments = this.props.instruments.filter((instrument) => {
      if(Helper.findInArrayById(instrument.id, teacher.instruments)) {
        return false;  
      }
      return instrument;
    });

    if(teacher.unavailable_weeks && teacher.unavailable_weeks.length > 0) {
      var unavailableWeeks = teacher.unavailable_weeks.map((week, index) => {
        var start = week.start_date.slice(5);
        var end = week.end_date.slice(5);

        return (
          <li key={week.id} className="admin-instrument-list-item">{start} - {end}
            <span data-id={week.id} className="glyphicon glyphicon-minus admin-remove-instrument" 
                  onClick={this.handleRemoveUnavailableFromTeacher}>
            </span>
          </li>
        );
      });
    }

    var displayedWeeks = this.props.appSettings.summerWeeks.value.map((weekString, index) => {
      var weekObject = {};
      weekObject.id = index;
      weekObject.value = weekString;

      return weekObject;
    });

    return (
      <tr>
        {
          (this.state.editing)
            ? <td>
                <SimpleForm handleSubmit={this.handleEdit}
                            toggleEdit={this.toggleEdit}
                            placeholderText={name}
                            inputClass="admin-edit-item-input"
                            btnClass="admin-edit-item-button"
                            btnText="Save"
                            id="editTeacher" />
              </td>
            : <td>{name}</td>
        }
        <td>
          <ul className="admin-list">{instruments}</ul>
          {
            (this.state.addingInstrument)
              ? 
                <SelectForm submitAction={this.handleAddInstrumentToTeacher}
                            toggleEdit={this.toggleAddInstrument}
                            selectOptions={displayedInstruments}
                            displayValue="name"
                            selectClass="admin-select"
                            selectId="addInstrumentToTeacher"
                            btnClass="admin-select-submit-button"
                            btnText="Add"
                            id="selectInstrumentForTeacher"
                            placeholderText="Instruments" />
              : null  
          } 
        </td>
        <td>
            <ul className="admin-list">{unavailableWeeks}</ul>
            {
              (this.state.updatingUnavailables)
                ? 
                  <SelectForm submitAction={this.handleAddUnavailableToTeacher}
                              toggleEdit={this.toggleUnavailableWeeks}
                              selectOptions={displayedWeeks}
                              displayValue="value"
                              selectClass="admin-select"
                              selectId="addUnavailableToTeacher"
                              btnClass="admin-select-submit-button"
                              btnText="Add"
                              id="selectUnavailablesForTeacher"
                              placeholderText="Dates" />
                : null  
            } 
        </td>       
        <td className="admin-actions-icons">
          <a href="#" title="Edit" className="glyphicon glyphicon-pencil" onClick={this.toggleEdit}></a>&nbsp;
          <a href="#" title="Edit Instruments" className="glyphicon glyphicon-music" onClick={this.toggleAddInstrument}></a>&nbsp;
          <a href="#" title="Unavailable Dates" className="glyphicon glyphicon-ban-circle" onClick={this.toggleUnavailableWeeks}></a>
          <a href="#" title="Delete" className="glyphicon glyphicon-remove" onClick={this.handleDelete}></a>&nbsp;
        </td>
      </tr>
    );
  }
});