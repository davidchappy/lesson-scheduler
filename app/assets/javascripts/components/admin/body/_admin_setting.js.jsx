var AdminSetting = React.createClass({
	render() {
		return (
			<div className="row setting" key={this.props.name}>
				<label className="setting-name" htmlFor={this.props.settingName}>
					{this.props.name}: <span className="setting-value">{this.props.valueString}</span>
				</label>
				<p className="setting-description">
					{this.props.description}
				</p>	
				<div>
					<input type="text" defaultValue={this.props.value} 
					className="setting-input" onChange={this.props.enableSubmit}
					name={this.props.settingName} ref={this.props.settingName} id={this.props.settingName}/>
				</div>
			</div>
		)
	}
})