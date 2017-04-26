var AdminTeacher = React.createClass({
  getInitialState() {
    return {
      editing: false, deleting: false, addingInstrument: false
    }
  },

  handleDelete(e) {
    e.preventDefault();
    this.props.handleDeleteTeacher(this.props.teacher.id);
  },

  toggleEdit(e) {
    e.preventDefault();
    var editing = this.state.editing ? false : true;
    this.setState({ editing: editing });
  },

  handleEdit(submittedName) {
    var names = Helper.processTeacherName(submittedName);
    this.setState({ editing: false });
    this.props.updateTeacher(this.props.teacher.id, names[0], names[1]);
  },

  toggleAddInstrument(e) {
    e.preventDefault();
    var addingInstrument = this.state.addingInstrument ? false : true;
    this.setState({ addingInstrument: addingInstrument });
  },

  handleAddInstrumentToTeacher(instrumentId) {
    this.props.addInstrumentToTeacher(instrumentId, this.props.teacher)
  },

  handleRemoveInstrumentFromTeacher(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeInstrumentFromTeacher(id, this.props.teacher);
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
      if(Helper.findElementInArrayById(instrument.id, teacher.instruments)) {
        return false;  
      }
      return instrument;
    });

    return (
      <tr>
        {
          (this.state.editing)
            ? <td>
                <SimpleForm handleSubmit={this.handleEdit}
                            placeholderText={name}
                            inputClass="admin-edit-item-input"
                            btnClass="admin-edit-item-button"
                            btnText="Save" />
              </td>
            : <td>{name}</td>
        }
        <td>
          <ul className="admin-list">{instruments}</ul>
          {
            (this.state.addingInstrument)
              ? 
                <SelectForm selectOptions={displayedInstruments}
                            displayValue="name"
                            selectClass="admin-select"
                            selectId="addInstrumentToTeacher"
                            btnClass="admin-select-submit-button"
                            btnText="Add"
                            handleAddInstrumentToTeacher={this.handleAddInstrumentToTeacher} />
              : null  
          } 
        </td>       
        <td>
          <a href="#" onClick={this.toggleEdit}>Edit</a>&nbsp;|&nbsp;
          <a href="#" onClick={this.handleDelete}>Delete</a>&nbsp;|&nbsp;
          <a href="#" onClick={this.toggleAddInstrument}>Add Instrument</a>
        </td>
      </tr>
    );
  }
});