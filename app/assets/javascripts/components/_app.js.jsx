var App = React.createClass({
  getInitialState() {
    return {  instruments: undefined, teachers: undefined,
              family: undefined, form: undefined, students: undefined, 
              lessonPeriods: undefined, weeks: undefined, totalLessonCount: 0,
              isCreating: false, isConfirming: false, hasSubmitted: false }
  },
  componentDidMount() {
    this.fetchAppData();
  },
  fetchAppData() {
    $.ajax({
      url: '/api/v1/app.json', 
      type: 'GET',
      success: (response) => {
        console.log(response);
        if(response.form.submitted === true) {
          this.setState({ hasSubmitted: true })
        }
        this.setState({ 
                        instruments: response.instruments,
                        teachers: response.teachers,
                        family: response.family,  
                        form: response.form,
                        students: response.students,
                        lessonPeriods: response.lesson_periods,
                        weeks: response.weeks
                      });
        this.adjustLessonCount(response.lesson_periods);
      }
    });
  },
  toggleCreating() {
    // shows or hides add lesson period button
    var showLessonPeriod = this.state.isCreating ? false : true;
    this.setState({ isCreating: showLessonPeriod });
  },
  toggleConfirming() {
    var isConfirming = this.state.isConfirming ? false : true;
    this.setState({ isConfirming: isConfirming });
  },
  updateFromNewLessonPeriod(lessonPeriod, student) {
    this.toggleCreating();

    // update app state lesson periods after creating new lesson period
    var lessonPeriods = this.state.lessonPeriods;
    lessonPeriods.push(lessonPeriod);
    this.setState({ lessonPeriods: lessonPeriods });

    // update app state students after creating new lesson period
    var students = this.state.students;
    var studentExists = this.state.students.find((s) => {
      return s.id === lessonPeriod.student_id;
    });
    if(studentExists) {
      var index;
      students.map((s, i) => {
        index = s.id === student.id ? i : index;
      });
      students[index] = student;
    } else {
      students.push(student);
    }

    this.setState({ students: students });
  },
  updateFromEditLessonPeriod(lessonPeriod, student) {
    // update app state lesson periods after editing a lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var index; 
    lessonPeriods.map( (l, i) => {
      index = l.id === lessonPeriod.id ? i : index;
    });
    lessonPeriods[index] = lessonPeriod;

    var students = this.state.students;
    var index; 
    students.map( (s, i) => {
      index = s.id === student.id ? i : index;
    });
    students[index] = student;

    this.setState({ lessonPeriods: lessonPeriods, students: students });
  },
  updateFromDeleteLessonPeriod(lessonPeriod) {
    // update app state lesson periods after deleting a lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods.splice(lessonPeriodIndex, 1);

    this.adjustLessonCount(lessonPeriods);
  },
  adjustLessonCount(lessonPeriods) {
    // update app state lesson count, total cost, and lesson periods after a change
    var newTotal = 0;
    lessonPeriods.map((lessonPeriod) => {
      newTotal += lessonPeriod.lesson_count;
    });

    this.setState({ totalLessonCount: newTotal, lessonPeriods: lessonPeriods });
  },
  submitForm() {
    // Ensure the form record has the current total cost
    var id = this.state.form.id;
    var pricing = calculatePricing(this.state.lessonPeriods);
    console.log(totalOwed);
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'PUT',
      data: { form: { total_cost: pricing.totalOwed } }
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
                lessonPeriods={this.state.lessonPeriods}
                hasSubmitted={this.state.hasSubmitted}
                handleClickAddStudent={this.toggleCreating} />

        {this.state.hasSubmitted ? 

          <AlreadySubmitted submitted_at={this.state.form.submitted_at} /> :

          <Body {...this.state}
                handleToggleConfirming={this.toggleConfirming}
                handleClickAddStudent={this.toggleCreating}
                passLessonCount={this.adjustLessonCount} 
                updateFromNewLessonPeriod={this.updateFromNewLessonPeriod}
                updateFromEditLessonPeriod={this.updateFromEditLessonPeriod}
                updateFromDeleteLessonPeriod={this.updateFromDeleteLessonPeriod} 
                submitForm={this.submitForm} />
        }
      </div>
    )
  }
});