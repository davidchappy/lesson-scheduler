var AdminInstrument = React.createClass({

  render() {
    var instrument = this.props.instrument;
    var teachers;
    if(instrument.teachers && instrument.teachers.length > 0) {
        teachers = instrument.teachers.map((teacher) => {
        var name = teacher.first_name + " " + teacher.last_name;

        return (
          <li key={instrument.id}>{name}</li>
        );
      })
    }

    return (
      <tr>
        <td>{instrument.name}</td>
        <td>
          <ul className="admin-list">{teachers}</ul>
        </td>
      </tr>
    );
  }
});