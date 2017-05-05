var AdminFamily = React.createClass({

  handleRemoveCodeFromFamily(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeCodeFromFamily(id, this.props.family);
  },

  render() {
    var familyUrl = "/?family_id=" + this.props.family.id;
    var studentCount = this.props.family.lesson_periods.length;
    
    var form = this.props.family.forms[this.props.family.forms.length - 1];
    var formSubmission = form.submitted_at ? Helper.formatDate(new Date(form.submitted_at)) : "Never";

    var profiles = this.props.family.setting_profiles.map((profile) => {
      return (
        <li key={profile.id}
            className="admin-instrument-list-item">{profile.code}
            <span data-id={profile.id} className="glyphicon glyphicon-minus admin-remove-instrument" 
                  onClick={this.handleRemoveCodeFromFamily}>
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
        <td>{formSubmission}</td>
        <td>{form.submission_count}</td>
        <td><a href={familyUrl}>View/Edit</a></td>
      </tr>
    );
  }
});