var AdminFamily = React.createClass({

  getInitialState() {
    return ({ deleting: false })
  },

  handleRemoveCodeFromFamily(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeCodeFromFamily(id, this.props.family);
  },

  toggleDeleteFamily(e) {
    e.preventDefault();
    this.setState({ deleting: !this.state.deleting });
  },

  handleDeleteFamily(e) {
    e.preventDefault();
    this.props.deleteFamily(this.props.family.id);
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

    if(this.state.deleting) {
      return (
        <tr>
          <td colSpan={8} className="admin-families-delete-confirm">Are you sure? 
            <a href="#" onClick={this.handleDeleteFamily} className="red">Yes</a>|
            <a href="#" onClick={this.toggleDeleteFamily}>No</a>
          </td>
        </tr>
      ) 
    } else {
      return (
        <tr>
          <td>{this.props.family.last_name}</td>
          <td>{studentCount}</td>
          <td>
            <ul className="admin-list">{profiles}</ul>
          </td>
          <td>{formSubmission}</td>
          <td>{form.submission_count}</td>
          <td>{this.props.family.last_seen || "Never"}</td>
          <td><a href="#" onClick={this.toggleDeleteFamily}>Delete</a></td>
          <td><a href={familyUrl}>View/Edit</a></td>
        </tr>
      )
    }




  }
});