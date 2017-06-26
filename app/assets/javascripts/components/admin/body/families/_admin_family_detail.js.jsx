var AdminFamilyDetail = React.createClass({

  handleRemoveCodeFromFamily(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeCodeFromFamily(id, this.props.family);
  },

  render() {
    var familyUrl = "/?family_id=" + this.props.family.id;
    var studentCount = this.props.family.lesson_periods.length;
    
    var form = this.props.family.forms[this.props.family.forms.length - 1];
    if(form) {
      var formSubmission = form.submitted_at ? Helper.formatDate(new Date(form.submitted_at)) : "Never";
    }

    var rawCost = form.total_cost ? form.total_cost : "$0";
    var payments = Pricer.getPayments(Pricer.deMonetize(rawCost)).map((payment, i) => {
      return (
        <li key={i} className="admin-instrument-list-item">{Pricer.monetize(payment)}</li>
      );
    });

    var payment1 = Pricer.monetize(payments[0]);
    var payment2 = Pricer.monetize(payments[1]);
    var payment3 = Pricer.monetize(payments[2]);

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
      <tbody>
        <tr>
          <th>Last Name</th>
          <td>{this.props.family.last_name}</td>
        </tr>
        <tr>
          <th># of Students</th>
          <td>{studentCount}</td>
        </tr>
        <tr>
         <th>Active Codes</th>
          <td>
            <ul className="admin-list">{profiles}</ul>
          </td>
        </tr>
        <tr>
          <th>Last Submitted</th>
          <td>{formSubmission}</td>
        </tr>
        <tr>
          <th>Submission</th>
          <td>{form.submission_count}</td>
        </tr>
        <tr>
          <th>Last Seen</th>
          <td>{this.props.family.last_seen || "Never"}</td>
        </tr>
        <tr>
          <th>Total Owed</th>
          <td>
          {form.total_cost}
          </td>
        </tr>
        <tr>
          <th>Payments</th>
          <td>
            <ul className="admin-list">{payments}</ul>
          </td>
        </tr>
        <tr style={ {textAlign: "center"} }>
          <td colSpan="2"><a href={familyUrl}>View as Family</a></td>
        </tr>
      </tbody>
    )
  }

});