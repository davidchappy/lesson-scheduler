var App = React.createClass({
  getInitialState() {
    return {  family: undefined, form: undefined,  
              lessonPeriods: undefined, totalLessonCount: 0,
              showAddLessonPeriod: false, alreadySubmitted: false,
              totalDiscount: 0, totalOwed: 0, possibleDiscount: 0 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => {
        if(response.form.submitted === true) {
          this.setState({ alreadySubmitted: true })
        }
        this.setState({ family: response.family,  
                        form: response.form,
                        lessonPeriods: response.lesson_periods,
                      });
        this.adjustLessonCount(response.lesson_periods);
        this.calculateTotalCost();
      }
    });
  },
  toggleNewLessonPeriod() {
    // shows or hides add lesson period button
    var showLessonPeriod = this.state.showAddLessonPeriod ? false : true;
    this.setState({ showAddLessonPeriod: showLessonPeriod });
  },
  handleNewLessonPeriod(lessonPeriod) {
    // keeps component state updated with a new lesson period
    var lessonPeriods = this.state.lessonPeriods;
    lessonPeriods.push(lessonPeriod);
    this.setState({ lessonPeriods: lessonPeriods });
  },
  handleDeletedLessonPeriod(lessonPeriod) {
    // keeps component state updated with a deleted lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods.splice(lessonPeriodIndex, 1);

    this.adjustLessonCount(lessonPeriod);
  },
  adjustLessonCount(lessonPeriods) {
    // update the lesson count
    var newTotal = 0;
    lessonPeriods.map((lessonPeriod) => {
      newTotal += lessonPeriod.lesson_count;
    });

    this.setState({ totalLessonCount: newTotal, lessonPeriods: lessonPeriods });
    this.calculateTotalCost();
  },
  calculateTotalCost() {
    // get values from props
    var lessonCount = Number(this.state.totalLessonCount);
    var lessonPeriods = this.state.lessonPeriods;
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

    this.updatePricing(discount, totalOwed, possibleDiscount);
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
  updatePricing(discount, totalOwed, possibleDiscount) {
    this.setState({
      totalDiscount: discount,
      totalOwed: totalOwed,
      possibleDiscount: possibleDiscount
    })  
  },
  monetize(amount) {
    return ("$" + (amount/100));
  },
  submitForm() {
    var id = this.state.form.id;
    var totalOwed = this.state.totalOwed;
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'PUT',
      data: { form: { total_cost: totalOwed } },
      success: (form) => { 
        console.log(form);
      }
    });
  },
  render() {
    if ( !this.state.family || !this.state.form || !this.state.lessonPeriods) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div>
        <Header family={this.state.family} 
                lessonCount={this.state.totalLessonCount} 
                toggleNewLessonPeriod={this.toggleNewLessonPeriod}
                alreadySubmitted={this.state.alreadySubmitted} 
                monetize={this.monetize} 
                totalOwed={this.state.totalOwed}
                totalDiscount={this.state.totalDiscount}
                possibleDiscount={this.state.possibleDiscount} />
        {this.state.alreadySubmitted ? 
          <AlreadySubmitted submitted_at={this.state.form.submitted_at} /> :
          <Body   passLessonCount={this.adjustLessonCount} 
                  lessonPeriods={this.state.lessonPeriods} 
                  form={this.state.form}
                  handleSubmit={this.handleNewLessonPeriod}
                  handleDeletedLessonPeriod={this.handleDeletedLessonPeriod} 
                  toggleNewLessonPeriod={this.toggleNewLessonPeriod} 
                  showAddLessonPeriod={this.state.showAddLessonPeriod} 
                  submitForm={this.submitForm} 
                  totalOwed={this.state.totalOwed} 
                  monetize={this.monetize} />
        }
      </div>
    )
  }
});