var Header = React.createClass({
  getInitialState() {
    return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentDidMount() {
    this.setState({family: this.props.family });
  },
  componentWillReceiveProps() {
    this.calculateDiscount(); 
  },
  calculateDiscount() {
    var lessonCount = Number(this.props.lessonCount);
    var formCount = Number(this.props.family.form_count);
    var originalTotal = formCount * 8000;
    var discount = 0;
    discount += (formCount-1) * 2000;
    discount += lessonCount * 100;
    console.log("Discount: " + discount);

    this.setState({
      totalDiscount: discount,
      totalOwed: originalTotal - discount,
      possibleDiscount: formCount * 13 * 100
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

    var family = this.props.family;
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
              <li><a>Total Lessons: {this.props.lessonCount}</a></li>
              <li role="separator" className="divider"></li>
              <li><a>Possible Discount: {possibleDiscount}</a></li>                
              <li role="separator" className="divider"></li>
              <li><a>Discount: {totalDiscount}</a></li>              
              <li role="separator" className="divider"></li>
              <li><a>Total: {total}</a></li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});