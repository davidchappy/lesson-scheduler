var AdminBody = React.createClass({

	render() {
		return (
			<div className="wrapper">
        <div className="body admin-body container">  
        	<div className="tab-content">
        		<AdminSettings 	{...this.props}	
        										handleUpdateSetting={this.props.handleUpdateSetting}
        										handleSaveSetting={this.props.handleSaveSetting} />
        		<div role="tabpanel" className="tab-pane" id="content">Content</div>
				    <div role="tabpanel" className="tab-pane" id="families">Families</div>
				    <div role="tabpanel" className="tab-pane" id="teachers">Teachers</div>
				    <div role="tabpanel" className="tab-pane" id="instruments">Instruments</div>
				    <div role="tabpanel" className="tab-pane" id="dashboard">Dashboard</div>
				    <div role="tabpanel" className="tab-pane" id="account">Account</div>
        	</div>
        </div>
      </div>    
		)
	}

});