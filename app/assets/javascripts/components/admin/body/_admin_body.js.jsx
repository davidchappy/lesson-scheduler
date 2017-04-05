var AdminBody = React.createClass({

	render() {
		return (
			<div className="wrapper">
        <div className="body container">  
        	<AdminSettings {...this.props}/>
        </div>
      </div>    
		)
	}

});