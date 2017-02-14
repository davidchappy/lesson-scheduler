var Header = React.createClass({
  getInitialState() {
    return { family: undefined, totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response });
        console.log(this.state.family);
        this.calculateDiscount(); 
      }
    });
  },
  calculateDiscount() {
    var week_count = Number(this.state.family.week_count);
    var form_count = Number(this.state.family.form_count);
    var total_owed = Number(this.state.family.total_owed);
    var original_total = form_count * 8000;
    var discount = 0;
    discount += (form_count-1) * 2000;
    discount += week_count * 100;

    this.setState({
      totalDiscount: discount,
      totalOwed: original_total - discount,
      possibleDiscount: form_count * 13 * 100
    })
  },
  monetize(amount) {
    return ("$" + (amount/100));
  },
  render() {
    if ( !this.state.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.state.family;
    var total = this.monetize(this.state.totalOwed);
    var totalDiscount = this.monetize(this.state.totalDiscount);
    var possibleDiscount = this.monetize(this.state.possibleDiscount);

    return (
      <div className="navbar navbar-inverse navbar-fixed-top header">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">The {family.last_name} Family</a>
          </div>
          <div id="navbar" className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
              <li role="separator" className="divider"></li>
              <li><a>Possible Discount: {possibleDiscount}</a></li>                
              <li role="separator" className="divider"></li>
              <li><a>Total: {total}</a></li>
              <li role="separator" className="divider"></li>
              <li><a>Discount: {totalDiscount}</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});