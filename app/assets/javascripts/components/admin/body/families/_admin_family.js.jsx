var AdminFamily = React.createClass({
  render() {
    var familyUrl = "/?family_id=" + this.props.family.id;
    var studentCount = this.props.family.lesson_periods.length;

    return (
      <tr>
        <td>{this.props.family.last_name}</td>
        <td>{studentCount}</td>
        <td><a href={familyUrl}>View/Edit</a></td>
      </tr>
    );
  }
});