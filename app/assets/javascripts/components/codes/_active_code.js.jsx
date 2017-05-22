var ActiveCode = React.createClass({

  getInitialState() {
    return ({ deleting: false })
  },

  toggleDeletingCode(e) {
    e.preventDefault();
    this.setState({ deleting: !this.state.deleting });
  },

  handleRemoveCodeFromFamily(e) {
    var id = e.target.getAttribute('data-id');
    this.props.removeCodeFromFamily(id, this.props.family);
  },
  
  render() {
    return (
      <li key={this.props.profile.id}>
        {
          this.state.deleting
            ? <p>Are you sure you want to remove this code?&nbsp; 
                <a  href="#" 
                    data-id={this.props.profile.id} 
                    onClick={this.handleRemoveCodeFromFamily}>Yes</a>
                &nbsp;|&nbsp;<a href="#" onClick={this.toggleDeletingCode}>No</a>
              </p>
            : <p>{this.props.profile.name} {this.props.expiration}
                <span className="family-settings-remove-code"> 
                  <a href="#" onClick={this.toggleDeletingCode}>Delete Code</a>
                </span>
              </p>
        }
      </li>
    )
  }
  
});