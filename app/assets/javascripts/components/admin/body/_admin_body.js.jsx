var AdminBody = React.createClass({

	render() {
		return (
			<div className="wrapper">
        <div className="body admin-body container">  
        	<div className="tab-content">
          	<AdminSettings 	  {...this.props}	
          										handleSaveSetting={this.props.saveAppSetting} />
            <SettingProfiles  {...this.props} />
        		<AdminContentEntries {...this.props} 
                              handleSaveEntry={this.props.saveContentEntry}/>
				    <AdminFamilies    {...this.props} />
				    <AdminTeachers    {...this.props} />
				    <AdminInstruments {...this.props} />
        	</div>
        </div>
      </div>    
		)
	}

});