var AdminFamily = React.createClass({
  render() {
    var familyUrl = "/?family_id=" + this.props.family.id;
    var studentCount = this.props.family.lesson_periods.length;
    var profiles = this.props.family.setting_profiles.map((profile) => {
      return (
        <li key={profile.id}
            className="admin-instrument-list-item">{profile.code}
            <span data-id={profile.id} className="glyphicon glyphicon-minus admin-remove-instrument" >
            </span>
        </li>
      );
    });

    return (
      <tr>
        <td>{this.props.family.last_name}</td>
        <td>{studentCount}</td>
        <td>
          <ul className="admin-list">{profiles}</ul>
        </td>
        <td>
          {
            this.props.family.forms[0].submitted_at
              ? Helper.formatDate(new Date(this.props.family.forms[0].submitted_at))
              : "Never"
          }
        </td>
        <td>{this.props.family.forms[0].submission_count}</td>
        <td><a href={familyUrl}>View/Edit</a></td>
      </tr>
    );
  }
});