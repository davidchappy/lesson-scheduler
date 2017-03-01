var Header = React.createClass({
  getInitialState() {
    return { totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentWillReceiveProps(nextProps) {
    this.calculateTotalCost(nextProps); 
  },
  calculateTotalCost(props) {
    // get values from props
    var lessonCount = Number(props.lessonCount);
    var lessonPeriods = props.lessonPeriods;
    var lessonPeriodCount = lessonPeriods.length;


    // initialize vars
    var discount = 0;
    var totalOwed = 0;
    var rawTotal = lessonCount * 2000;

    // iterate through lessonPeriods and calculate cost and discounts
    lessonPeriods.map((lessonPeriod) => {
      totalOwed += this.calculateLessonPeriodCost(lessonPeriod, lessonPeriodCount, lessonPeriods);
    })
    discount = rawTotal - totalOwed;

    var possibleDiscount = this.calculatePossibleDiscount(lessonPeriodCount);
    this.props.passTotalOwed(totalOwed)

    this.setState({
      totalDiscount: discount,
      totalOwed: totalOwed,
      possibleDiscount: possibleDiscount
    })
  },
  calculateLessonPeriodCost(lessonPeriod, lessonPeriodCount, lessonPeriods) {
    var lessonCount = lessonPeriod.lesson_count;
    var lessonPeriodDiscount = 0;
    var lessonRate = 2000;
    var cost = 0;

    // Apply discount for more than 1 lessonPeriod
    if(lessonPeriodCount >= 2) {
      if(lessonPeriods.indexOf(lessonPeriod) == 0) {
        lessonRate = 2000;
      } else if(lessonPeriods.indexOf(lessonPeriod) == 1) {
        lessonRate = 1800;
      } else {
        lessonRate = 1600;
      }
    }

    // Apply discount for more than 8 lessons per lessonPeriod
    if(lessonCount >= 9 && lessonCount <= 10) {
      lessonPeriodDiscount += 2000;
    } else if (lessonCount >= 11) {
      lessonPeriodDiscount += 3000;
    }

    // Apply discount for more than 9 lessons and more than 1 lessonPeriod
    if(lessonCount > 9 && lessonPeriodCount > 1) {
      if(lessonPeriods.indexOf(lessonPeriod) >= 1) {
        lessonPeriodDiscount += 500;
      }
    }

    cost = (lessonCount * lessonRate) - lessonPeriodDiscount;
    return cost;
  },
  calculatePossibleDiscount(lessonPeriodCount) {
    var possibleDiscount = 0;
    possibleDiscount = (3000 * lessonPeriodCount) + (500 * (lessonPeriodCount-1));
    if(lessonPeriodCount >= 2) { 
      possibleDiscount += (200 * 13); 
    } 
    if(lessonPeriodCount > 2) { 
      possibleDiscount += ((400*13) * (lessonPeriodCount-2)); 
    } 
    return possibleDiscount;
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
    var maxDiscountClass = totalDiscount == possibleDiscount ? "max-discount" : "";

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
            {this.props.alreadySubmitted ? null :
              <button className="btn add-lesson-period" onClick={this.props.toggleNewLessonPeriod}>
                <span className="glyphicon glyphicon-plus"></span>
              </button>
            }
          </div>
          {this.props.alreadySubmitted ? 
            <div id="navbar" className="navbar-collapse collapse"></div> :
            <div id="navbar" className="navbar-collapse collapse">
              <ul className="nav navbar-nav navbar-right">
                <li role="separator" className="divider"></li>
                <li className="total-lessons"><a>
                  <span className="header-small">Lessons:</span> 
                  <span className="header-large">{lessonCount}</span>
                </a></li>
                <li role="separator" className="divider"></li>
                <li id="possibleDiscount" className={"possible-discount"}><a>
                  <span className="header-small">Possible Discount:</span> 
                  <span className={"header-large " + maxDiscountClass}>{possibleDiscount}</span>
                </a></li>                
                <li role="separator" className="divider"></li>
                <li id="currentDiscount" className="current-discount"><a>
                  <span className="header-small">Current Discount:</span> 
                  <span className="header-large">{totalDiscount}</span>
                </a></li>              
                <li role="separator" className="divider"></li>
                <li id="totalOwed" className="total-owed"><a>
                  <span className="header-small">Total:</span>
                  <span className="header-large">{total}</span>
                </a></li>
              </ul>
            </div>
          }
        </div>
      </div>
    )
  }
});