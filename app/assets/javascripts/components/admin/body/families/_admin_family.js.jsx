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

  viewFamilyDetails(e) {
    e.preventDefault();
    this.props.viewFamilyDetails(this.props.family);
  },

  render() {
    var familyUrl = "/?family_id=" + this.props.family.id;
    var studentCount = this.props.family.lesson_periods.length;

    var form = this.props.family.forms[this.props.family.forms.length - 1];
    var formSubmission;
    if(form) {
      formSubmission = form.submitted_at ? Helper.formatDate(new Date(form.submitted_at)) : "Never";
    }
    var submissionCount = form ? form.submission_count : 0;

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
          <td>{formSubmission}</td>
          <td>{submissionCount}</td>
          <td>{this.props.family.last_seen || "Never"}</td>
          <td><a href="#" onClick={this.toggleDeleteFamily}>Delete</a></td>
          <td><a href="#" onClick={this.viewFamilyDetails}>Details</a></td>
          <td><a href={familyUrl}>View as Family</a></td>
        </tr>
      )
    }




  }
});