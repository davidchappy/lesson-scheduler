var AdminBody = React.createClass({

	render() {
		return (
			<div className="wrapper">
        <div className="body admin-body container">  
        	<div className="tab-content">
        		<AdminSettings 	{...this.props}	
        										handleSaveSetting={this.props.saveAppSetting} />
        		<div role="tabpanel" className="tab-pane" id="content">Content</div>
				    <AdminFamilies {...this.props} />
				    <AdminTeachers {...this.props} />
				    <AdminInstruments {...this.props} 
                              createNewInstrument={this.props.createNewInstrument} />
				    <div role="tabpanel" className="tab-pane" id="account">Account</div>
        	</div>
        </div>
      </div>    
		)
	}

});