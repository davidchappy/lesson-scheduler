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
    var students = props.students;
    var studentCount = students.length;


    // initialize vars
    var discount = 0;
    var totalOwed = 0;
    var rawTotal = lessonCount * 2000;

    // iterate through students and calculate cost and discounts
    students.map((student) => {
      totalOwed += this.calculateStudentCost(student, studentCount, students);
    })
    discount = rawTotal - totalOwed;

    var possibleDiscount = this.calculatePossibleDiscount(studentCount);
    this.props.passTotalOwed(totalOwed)

    this.setState({
      totalDiscount: discount,
      totalOwed: totalOwed,
      possibleDiscount: possibleDiscount
    })
  },
  calculateStudentCost(student, studentCount, students) {
    var lessonCount = student.lesson_count;
    var studentDiscount = 0;
    var lessonRate = 2000;
    var cost = 0;

    // Apply discount for more than 1 student
    if(studentCount >= 2) {
      if(students.indexOf(student) == 0) {
        lessonRate = 2000;
      } else if(students.indexOf(student) == 1) {
        lessonRate = 1800;
      } else {
        lessonRate = 1600;
      }
    }

    // Apply discount for more than 8 lessons per student
    if(lessonCount >= 9 && lessonCount <= 10) {
      studentDiscount += 2000;
    } else if (lessonCount >= 11) {
      studentDiscount += 3000;
    }

    // Apply discount for more than 9 lessons and more than 1 student
    if(lessonCount > 9 && studentCount > 1) {
      if(students.indexOf(student) >= 1) {
        studentDiscount += 500;
      }
    }

    cost = (lessonCount * lessonRate) - studentDiscount;
    return cost;
  },
  calculatePossibleDiscount(studentCount) {
    var possibleDiscount = 0;
    possibleDiscount = (3000 * studentCount) + (500 * (studentCount-1));
    if(studentCount >= 2) { 
      possibleDiscount += (200 * 13); 
    } 
    if(studentCount > 2) { 
      possibleDiscount += ((400*13) * (studentCount-2)); 
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
              <button className="btn add-student" onClick={this.props.toggleNewStudentStudent}>
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