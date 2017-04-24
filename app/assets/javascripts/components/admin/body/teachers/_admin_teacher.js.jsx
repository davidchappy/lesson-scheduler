var AdminTeacher = React.createClass({

  handleAddInstrument(e) {
    e.preventDefault();
    console.log(e.target);
  },

  render() {
    var teacher = this.props.teacher;
    var instruments = teacher.instruments.map((instrument) => {
      return (
        <li key={instrument.id}>{instrument.name}</li>
      );
    })
    var name = teacher.first_name + " " + teacher.last_name;

    return (
      <tr>
        <td>{name}</td>
        <td>
          <ul className="instrument-list">{instruments}</ul>
        </td>
        <td><a href="#" onClick={this.handleAddInstrument}>Add Instrument</a></td>
      </tr>
    );
  }
});