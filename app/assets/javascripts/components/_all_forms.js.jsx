var AllForms = React.createClass({
  passLessonCount(count, form) {
    this.props.passLessonCount(count, form);
  },
  render() {
    var forms = this.props.forms.map((form) => {
      return (
        <Form key={form.id} form={form} updateLessonCount={this.passLessonCount} />
      )
    })
    return (
      <div className="forms row">
        {forms}
        {this.props.showAddStudent ? 
          <NewForm  instruments={this.props.instruments} 
                    teachers={this.props.teachers} 
                    showAddStudent={this.props.showAddStudent} 
                    handleTypeName={this.props.handleTypeName}
                    handleInstrumentSelect={this.props.handleInstrumentSelect}
                    handleTeacherSelect={this.props.handleTeacherSelect}  
                    handleSubmit={this.props.handleSubmit} /> :
          null
        }  
      </div>
    )
  }
});