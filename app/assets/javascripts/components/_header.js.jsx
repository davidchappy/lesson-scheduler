var Header = React.createClass({
  getInitialState() {
    return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentWillReceiveProps() {
    this.calculateTotalCost(); 
  },
  calculateTotalCost() {
    // get values from props
    var lessonCount = Number(this.props.lessonCount);
    console.log(lessonCount);
    var formCount = Number(this.props.family.form_count);
    var forms = this.props.forms;

    // initialize vars
    var possibleDiscount = 0;
    var discount = 0;
    var totalOwed = 0;
    var rawTotal = lessonCount * 2000;

    // iterate through forms and calculate cost and discounts
    forms.map((form) => {
      totalOwed += this.calculateFormCost(form);
      possibleDiscount += this.calculatePossibleDiscount(form);
    })
    discount = rawTotal - totalOwed;

    this.setState({
      totalDiscount: discount,
      totalOwed: totalOwed,
      possibleDiscount: possibleDiscount
    })
  },
  calculateFormCost(form) {
    var lessonCount = form.lesson_count;
    var formCount = this.props.forms.length;
    var formDiscount = 0;
    var lessonRate = 2000;
    var cost = 0;

    // Apply discount for more than 1 form
    if(formCount == 2) {
      lessonRate = 1800;
    } else if (formCount >= 3) {
      lessonRate = 1600;
    }

    // Apply discount for more than 8 lessons per form
    if(lessonCount >= 9 && lessonCount <= 10) {
      formDiscount += 2000;
    } else if (lessonCount >= 11) {
      formDiscount += 3000;
    }

    // Apply discount for more than 9 lessons and more than 1 form
    if(lessonCount > 9 && formCount > 1) {
      formDiscount += 500;
    }

    cost = (lessonCount * lessonRate) - formDiscount;
    return cost;
  },
  calculatePossibleDiscount(form) {
    return 0;
  },
  monetize(amount) {
    return ("$" + (amount/100));
  },
  render() {
    if ( !this.props.family ) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    var family = this.props.family;
    var lessonCount = this.props.lessonCount;
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
              <li><a>Total Lessons: {lessonCount}</a></li>
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