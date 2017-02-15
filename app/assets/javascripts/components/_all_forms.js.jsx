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
      <div className="forms row">{forms}</div>
    )
  }
});