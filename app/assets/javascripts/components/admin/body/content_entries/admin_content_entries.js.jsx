var AdminContentEntries = React.createClass({
  render() {
    var entriesObject = this.props.contentEntries;
    var entryNames = Object.keys(entriesObject).filter((entryName) => {
      // exclude entries here with conditionals
      return true;
    });
    var entries = entryNames.map((entryName) => {
      var name        = entriesObject[entryName].name;
      var value       = entriesObject[entryName].value;
      var description = entriesObject[entryName].description;
      var char_limit  = entriesObject[entryName].char_limit;

      return (
        <AdminContentEntry  key={entryName}
                            entryName={entryName}
                            htmlName={name}
                            rawValue={value}
                            description={description}
                            handleSaveEntry={this.props.handleSaveEntry} />
      )
    });

    return(
      <div role="tabpanel" className="tab-pane" id="content">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>Edit Content Entries</h1>
          <i>Important: for line breaks, type &lt;br&gt;, once per desired line break.</i>
          <br /> 
          <br /> 
          {entries}
        </div>
      </div>
    )
  }

});