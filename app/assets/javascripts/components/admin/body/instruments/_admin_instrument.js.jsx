var AdminInstrument = React.createClass({
  getInitialState() {
    return {
      editing: false, deleting: false
    }
  },

  handleDelete(e) {
    e.preventDefault();
    this.props.handleDeleteInstrument(this.props.instrument.id);
  },

  toggleEdit(e) {
    e.preventDefault();
    var editing = this.state.editing ? false : true;
    this.setState({ editing: editing });
  },

  handleEdit(newName) {
    this.setState({ editing: false });
    this.props.updateInstrument(this.props.instrument.id, newName);
  },

  render() {
    var instrument = this.props.instrument;
    var teachers;
    if(instrument.teachers && instrument.teachers.length > 0) {
      teachers = instrument.teachers.map((teacher) => {
        var name = teacher.first_name + " " + teacher.last_name;

        return (
          <li key={teacher.id}>{name}</li>
        );
      })
    }

    return (
      <tr>
        {
          (this.state.editing)
            ? <td>
                <SimpleForm handleSubmit={this.handleEdit}
                            placeholderText={instrument.name}
                            inputClass="admin-edit-item-input"
                            btnClass="admin-edit-item-button"
                            btnText="Save" />
              </td>
            : <td>{instrument.name}</td>
        }
        <td>
          <ul className="admin-list">{teachers}</ul>
        </td>
        <td>
          <a href="#" onClick={this.toggleEdit}>Edit</a>&nbsp;|&nbsp;
          <a href="#" onClick={this.handleDelete}>Delete</a>
        </td>
      </tr>
    );
  }
});