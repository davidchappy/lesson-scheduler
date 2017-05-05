var InvalidCode = React.createClass({
  render() {
    return (
      <div className={this.props.classes}>
        <p>Code not found. Please try typing your code again.</p>
      </div>
    )
  }
})