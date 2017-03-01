var App = React.createClass({
  getInitialState() {
    return {  family: undefined, totalLessonCount: 0, 
              lessonPeriods: [], showAddLessonPeriod: false, 
              form: undefined, alreadySubmitted: false,
              totalOwed: 0 }
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
                        lessonPeriods: response.lesson_periods,
                        form: response.form,
                        totalLessonCount: response.form.lesson_count});
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
  handleEdit(lessonPeriod) {
    // keeps component state updated with an edited lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var index = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods[index] = lessonPeriod;
    this.setState({ lessonPeriods: lessonPeriods });
  },
  handleDeletedLessonPeriod(lessonPeriod) {
    // keeps component state updated with a deleted lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods.splice(lessonPeriodIndex, 1);

    this.adjustLessonCount(lessonPeriod);
  },
  adjustLessonCount(lessonPeriod) {
    // update the lessonPeriod and lessonPeriods array
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods[lessonPeriodIndex] = lessonPeriod;

    // update the lesson count
    var newTotal = 0;
    lessonPeriods.map((lessonPeriod) => {
      newTotal += lessonPeriod.lesson_count;
    });

    this.setState({ totalLessonCount: newTotal, lessonPeriods: lessonPeriods });
  },
  getLessonCount() {
    return this.state.totalLessonCount;
  },
  setTotalOwed(total) {
    this.setState({ totalOwed: total });
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
    if ( !this.state.family ) {
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
                lessonPeriods={this.state.lessonPeriods}
                toggleNewLessonPeriod={this.toggleNewLessonPeriod}
                alreadySubmitted={this.state.alreadySubmitted} 
                passTotalOwed={this.setTotalOwed} />
        {this.state.alreadySubmitted ? 
          <AlreadySubmitted submitted_at={this.state.form.submitted_at} /> :
          <Body   passLessonCount={this.adjustLessonCount} 
                  lessonPeriods={this.state.lessonPeriods} 
                  form={this.state.form}
                  handleSubmit={this.handleNewLessonPeriod}
                  handleDeletedLessonPeriod={this.handleDeletedLessonPeriod} 
                  toggleNewLessonPeriod={this.toggleNewLessonPeriod} 
                  showAddLessonPeriod={this.state.showAddLessonPeriod} 
                  submitForm={this.submitForm} />
        }
      </div>
    )
  }
});