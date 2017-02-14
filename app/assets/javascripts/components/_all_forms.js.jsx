var AllForms = React.createClass({
  render() {
    var forms = this.props.forms.map((form) => {
      return (
        <Form key={form.id} form={form} />
      )
    })
    return (
      <div className="forms">{forms}</div>
    )
  }
});