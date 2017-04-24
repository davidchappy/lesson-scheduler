var AdminHeader = React.createClass({


	render() {
		return (
			<div>
				<div className="navbar navbar-inverse navbar-fixed-top admin-header">
		      <div className="container">
			      <div className="navbar-header">
	            <a className="navbar-brand" href="/">DMS Summer Forms Admin</a>
	          </div>
	        </div>
	      </div>
		    <div className="admin-navigation">
				  <ul className="nav nav-pills" role="pilllist">
				    <li role="presentation" className="active"><a href="#settings" aria-controls="settings" role="pill" data-toggle="pill">Settings</a></li>
				    <li role="presentation"><a href="#content" aria-controls="content" role="pill" data-toggle="pill">Content</a></li>
				    <li role="presentation"><a href="#families" aria-controls="families" role="pill" data-toggle="pill">Families</a></li>
				    <li role="presentation"><a href="#dashboard" aria-controls="dashboard" role="pill" data-toggle="pill">Dashboard</a></li>
				    <li role="presentation"><a href="#teachers" aria-controls="teachers" role="pill" data-toggle="pill">Teachers</a></li>
				    <li role="presentation"><a href="#instruments" aria-controls="instruments" role="pill" data-toggle="pill">Instruments</a></li>
				    <li role="presentation"><a href="#account" aria-controls="account" role="pill" data-toggle="pill">Account</a></li>
				  </ul>
				</div>
			</div>
		)
	}

})