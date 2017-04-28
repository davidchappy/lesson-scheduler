var App = React.createClass({
  getInitialState() {
    return {  instruments: undefined, teachers: undefined,
              family: undefined, form: undefined, students: undefined, 
              lessonPeriods: undefined, allWeeks: undefined, isCreating: false, 
              isConfirming: false, hasSubmitted: false, isSubmittable: false,
              appSettings: undefined }
  },
  componentDidMount() {
    this.fetchAppData();    
  },
  fetchAppData() {
    $.ajax({
      url: '/api/v1/app.json', 
      type: 'GET',
      data: { family_id: this.props.family_id },
      success: (response) => {
        // console.log("App Settings in app component", response.app_settings);
        var isSubmittable = response.lesson_periods.length ? true : false;
        // window.flash_messages.printMessages(response.messages);
        this.setState({ 
                        instruments: response.instruments,
                        teachers: response.teachers,
                        family: response.family,  
                        form: response.form,
                        students: response.students,
                        lessonPeriods: response.lesson_periods,
                        allWeeks: response.weeks,
                        hasSubmitted: response.form.submitted,
                        isSubmittable: isSubmittable,
                        appSettings: response.app_settings,
                      });
      }
    });
  },
  submitForm() {
    // Ensure the form record has the current total cost
    settings = this.state.appSettings;
    var id = this.state.form.id;
    var pricing = Pricer.calculatePricing(this.state.lessonPeriods, this.state.allWeeks, 
                                          settings.baseLessonLength.value,
                                          settings.thirtyMinRate.value);
    $.ajax({
      url: `/api/v1/forms/${id}.json`, 
      type: 'PUT',
      data: { form: { total_cost: Pricer.monetize(pricing.totalOwed) } }
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
  updateFromNewLessonPeriod(lessonPeriod, student, weeks) {
    this.toggleCreating();

    // update app state lesson periods after creating new lesson period
    var lessonPeriods = this.state.lessonPeriods;
    lessonPeriods.push(lessonPeriod);

    // update weeks object
    var allWeeks = this.state.allWeeks;
    var id = weeks[0].lesson_period_id;
    allWeeks[id] = weeks;

    // update app state students after creating new lesson period
    var students = this.state.students;
    if(Helper.contains.call(students, student)) {
      var index;
      students.map((s, i) => {
        index = s.id === student.id ? i : index;
      });
      students[index] = student;
    } else {
      students.push(student);
    }
    this.setState({ 
                    students: students, 
                    lessonPeriods: lessonPeriods, 
                    allWeeks: allWeeks,
                    isSubmittable: true 
                  });
  },
  updateFromEditLessonPeriod(lessonPeriod, student) {
    // find this lesson period in lessonPeriods
    var lessonPeriods = this.state.lessonPeriods;
    var index; 
    lessonPeriods.map( (l, i) => {
      index = l.id === lessonPeriod.id ? i : index;
    });

    // if default lesson length has changed, update weeks' lesson length
    oldLessonLength = lessonPeriods[index].default_lesson_length;
    newLessonLength = lessonPeriod.default_lesson_length;
    var allWeeks = this.state.allWeeks;
    weeks = allWeeks[lessonPeriod.id];
    var isDefaultLengthChanged = oldLessonLength === newLessonLength ? false : true;
    if(isDefaultLengthChanged) {
      var weeks = Helper.updateLessonLengthInWeeks(weeks, newLessonLength);
    }
    allWeeks[lessonPeriod.id] = weeks;

    // replace lessonPeriod in state
    lessonPeriods[index] = lessonPeriod;

    var students = this.state.students;
    var index; 
    students.map( (s, i) => {
      index = s.id === student.id ? i : index;
    });
    students[index] = student;

    this.setState({ lessonPeriods: lessonPeriods, students: students, allWeeks: allWeeks });
  },
  updateFromDeleteLessonPeriod(lessonPeriod) {
    // update app state lesson periods 
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriods.splice(lessonPeriodIndex, 1);

    // update app state weeks
    var allWeeks = this.state.allWeeks;
    allWeeks[lessonPeriod.id] = null;

    // ensures there's a minimum of one lesson period to submit form
    var isSubmittable = lessonPeriods.length ? true : false;

    this.setState({ lessonPeriods: lessonPeriods, isSubmittable: isSubmittable, allWeeks: allWeeks });
  },
  updateFromWeekChange(week) {
    // get the weeks array for this week
    var lessonPeriodId = week.lesson_period_id;
    var allWeeks = this.state.allWeeks;
    var targetWeeks = allWeeks[lessonPeriodId];

    // update weeks array and set it back in weeks object 
    var index = targetWeeks.indexOf(week);
    targetWeeks[index] = week;
    allWeeks[lessonPeriodId] = targetWeeks;

    // update count for this lesson period
    var lessonPeriods = this.state.lessonPeriods;
    var lessonPeriod = Helper.findElementInArrayById(lessonPeriodId, lessonPeriods);
    var index = lessonPeriods.indexOf(lessonPeriod);
    lessonPeriod.lesson_count = Helper.getLessonCountFromWeeks(targetWeeks);
    lessonPeriods[index] = lessonPeriod;

    this.setState({ lessonPeriods: lessonPeriods, allWeeks: allWeeks })
  },
  render() {
    if ( !this.state.family || !this.state.form || !this.state.lessonPeriods || !this.state.appSettings) {
      return (
        <div>
          <p>Loading</p>
        </div>
      )
    }

    return (
      <div>
        <Header {...this.state}
                {...this.props} />

        {this.state.hasSubmitted ? 

          <AlreadySubmitted submittedAt={this.state.form.submitted_at}
                            appSettings={this.state.appSettings} /> :

          <Body {...this.state}
                handleToggleConfirming={this.toggleConfirming}
                handleClickAddStudent={this.toggleCreating}
                passLessonCount={this.adjustLessonCount} 
                updateFromWeekChange={this.updateFromWeekChange}
                updateFromNewLessonPeriod={this.updateFromNewLessonPeriod}
                updateFromEditLessonPeriod={this.updateFromEditLessonPeriod}
                updateFromDeleteLessonPeriod={this.updateFromDeleteLessonPeriod} 
                submitForm={this.submitForm} />
        }
      </div>
    )
  }
});