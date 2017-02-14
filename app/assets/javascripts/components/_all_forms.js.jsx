var AllForms = React.createClass({
  render() {
    var forms = this.props.forms.map((form) => {
      return (
        <div key={form.id}>
          <Form form={form} />
        </div>
      )
    })
    return (
      <div>{forms}</div>
    )
  }
});