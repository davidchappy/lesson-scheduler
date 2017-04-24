var AdminInstruments = React.createClass({
  render() {
    var instruments = this.props.instruments.map((instrument) => {
      return (<AdminInstrument  key={instrument.id}
                                instrument={instrument} />);
    })

    return(
      <div role="tabpanel" className="tab-pane" id="instruments">
        <div className="col-xs-10 col-xs-offset-1 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
          <h1>All Instruments</h1>
          <div className="table-responsive admin-table">
            <table className="table table-striped table-hover">
              <tbody>
                <tr>
                  <th>Instrument Name</th>
                  <th>Teachers</th>
                </tr>
                {instruments}
              </tbody>
            </table>
          </div>
          <SimpleForm handleNewInstrument={this.props.createNewInstrument}
                      formType="Instrument" />

        </div>
      </div>
    )
  }

});