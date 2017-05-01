var App = React.createClass({

  // *** APP INIT
  getInitialState() {
    return {  instruments: undefined, teachers: undefined,
              family: undefined, form: undefined, students: undefined, 
              lessonPeriods: undefined, allWeeks: undefined, isCreating: false, 
              isConfirming: false, hasSubmitted: false, isSubmittable: false,
              appSettings: undefined }
  },

  componentDidMount() {
    this.fetchAppData();
    $('#welcomeMessage').modal('show');
  },

  fetchAppData() {
    $.ajax({
      url: '/api/v1/app.json', 
      type: 'GET',
      data: { family_id: this.props.family_id },
      success: (response) => {
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

  // *** APP STATES ***
  toggleCreating() {
    // shows or hides add lesson period button
    var showLessonPeriod = this.state.isCreating ? false : true;
    this.setState({ isCreating: showLessonPeriod });
    if(!this.state.lessonPeriods.length) {
      ReactTooltip.show($('#ttLessonPeriodTutorial'));
    }
  },

  toggleConfirming() {
    // shows or hides confirmation screen
    var isConfirming = this.state.isConfirming ? false : true;
    this.setState({ isConfirming: isConfirming });
  },

  toggleLock(bool, lessonPeriod) {
    lessonPeriod.locked = bool;
    var student = Helper.findInArrayById(lessonPeriod.student_id, this.state.students);
    this.editLessonPeriod(  student.name, 
                            lessonPeriod.instrumentId, 
                            lessonPeriod.teacherId, 
                            lessonPeriod);
  },


  // *** ACTIONS ***
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

  createLessonPeriod(name, instrumentId, teacherId, defaultLessonLength) {
    this.toggleCreating();
    var formId = this.state.form.id;
    ReactTooltip.hide($('#ttLessonPeriodTutorial'));

    $.ajax({
      url: '/api/v1/lesson_periods.json', 
      type: 'POST',
      data: { 
              family_id: this.props.family_id,
              name: name,
              lesson_period: {  form_id: formId, instrument_id: instrumentId, 
                                teacher_id: teacherId, default_lesson_length: defaultLessonLength } 
            },
      success: (response) => { 
        this.fetchAppData();
        // // window.flash_messages.printMessages(response.messages);
        // var lessonPeriod = response.lesson_period;
        // var student = response.student; // serialize
        // var weeks = response.weeks; // serialize

        // // update app state lesson periods after creating new lesson period
        // var lessonPeriods = Helper.clone(this.state.lessonPeriods);
        // lessonPeriods.push(lessonPeriod);

        // // update weeks object
        // var allWeeks = this.state.allWeeks;
        // var id = weeks[0].lesson_period_id;
        // allWeeks[id] = weeks;

        // // update app state students after creating new lesson period
        // var students = this.state.students;
        // if(Helper.contains.call(students, student)) {
        //   var index;
        //   students.map((s, i) => {
        //     index = s.id === student.id ? i : index;
        //   });
        //   students[index] = student;
        // } else {
        //   students.push(student);
        // }
        // this.setState({ 
        //                 students: students, 
        //                 lessonPeriods: lessonPeriods, 
        //                 allWeeks: allWeeks,
        //                 isSubmittable: true 
        //               });
      }
    });
  },

  editLessonPeriod(name, instrumentId, teacherId, lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'PUT',
      data: { 
              lesson_period: {  instrument_id: instrumentId, teacher_id: teacherId,
                                default_lesson_length: lessonPeriod.defaultLessonLength, 
                                locked: lessonPeriod.locked,
                                form_id: this.state.form.id },
              name: name 
            },
      success: (response) => {
        // window.flash_messages.printMessages(response.messages);
        this.fetchAppData();

        // var lessonPeriod = response.lesson_period;
        // var student = response.student;
        // var weeks = Helper.clone(this.props.allWeeks[lessonPeriod.id]);
        // var lessonMinimumState = Helper.checkLessonMinimum( lessonPeriod, 
        //                                                     weeks, 
        //                                                     this.props.appSettings.lessonMinimum.value);
        // console.log("lessonMinimumState in body", lessonMinimumState);
        // var clonedLessonPeriod = Helper.clone(lessonPeriod);
        // if(lessonMinimumState <= 0) {
        //   console.log("should equal true");
        //   clonedLessonPeriod.locked = true;
        // } else {
        //   clonedLessonPeriod.locked = false;
        // }
        // // find this lesson period in lessonPeriods
        // var lessonPeriods = this.state.lessonPeriods;
        // var index; 
        // lessonPeriods.map( (l, i) => {
        //   index = l.id === lessonPeriod.id ? i : index;
        // });

        // // if default lesson length has changed, update weeks' lesson length
        // oldLessonLength = lessonPeriods[index].default_lesson_length;
        // newLessonLength = lessonPeriod.default_lesson_length;
        // var allWeeks = this.state.allWeeks;
        // weeks = allWeeks[lessonPeriod.id];
        // var isDefaultLengthChanged = oldLessonLength === newLessonLength ? false : true;
        // if(isDefaultLengthChanged) {
        //   var weeks = Helper.updateLessonLengthInWeeks(weeks, newLessonLength);
        // }
        // allWeeks[lessonPeriod.id] = weeks;

        // // replace lessonPeriod in state
        // lessonPeriods[index] = lessonPeriod;

        // var students = this.state.students;
        // var index; 
        // students.map( (s, i) => {
        //   index = s.id === student.id ? i : index;
        // });
        // students[index] = student;

        // this.setState({ lessonPeriods: lessonPeriods, students: students, allWeeks: allWeeks });
      }
    });
  },

  deleteLessonPeriod(lessonPeriod) {
    var id = lessonPeriod.id;
    $.ajax({
      url: `/api/v1/lesson_periods/${id}.json`, 
      type: 'DELETE',
      success: (response) => { 
        // window.flash_messages.printMessages(response.messages);
        this.fetchAppData();
        // update app state lesson periods 
        // var lessonPeriods = this.state.lessonPeriods;
        // var lessonPeriodIndex = lessonPeriods.indexOf(lessonPeriod);
        // lessonPeriods.splice(lessonPeriodIndex, 1);

        // // update app state weeks
        // var allWeeks = this.state.allWeeks;
        // allWeeks[lessonPeriod.id] = null;

        // // ensures there's a minimum of one lesson period to submit form
        // var isSubmittable = lessonPeriods.length ? true : false;

        // this.setState({ lessonPeriods: lessonPeriods, isSubmittable: isSubmittable, allWeeks: allWeeks });
      }
    });
  },

  editWeek(week) {
    var lessonPeriod = Helper.findInArrayById(week.lesson_period_id, this.state.lessonPeriods);
    var oldWeeks = Helper.clone(this.state.allWeeks[lessonPeriod.id]);
    var lessonMinimumState = Helper.checkLessonMinimum( lessonPeriod, 
                                                        oldWeeks,
                                                        this.state.appSettings.lessonMinimum.value, 
                                                        week);

    if(lessonMinimumState >= 0) {
      // Lock lesson period if at minimum state
      lessonPeriod.locked = lessonMinimumState === 0 ? true : false;

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
      var lessonPeriod = Helper.findInArrayById(lessonPeriodId, lessonPeriods);
      var index = lessonPeriods.indexOf(lessonPeriod);
      lessonPeriod.lesson_count = Helper.getLessonCountFromWeeks(targetWeeks);
      lessonPeriods[index] = lessonPeriod;
      this.setState({ lessonPeriods: lessonPeriods, allWeeks: allWeeks })

      $.ajax({
        url: `/api/v1/weeks/${week.id}.json`,
        type: 'PUT',
        data: { week: { lesson: week.lesson, lesson_length: week.lesson_length } },
        success: (response) => {
          // if(lessonMinimumState === 0) {
          //   this.toggleLock(true, lessonPeriod);
          // }
          // this.fetchAppData();
        }
      });
    } else {
      this.toggleLock(true, lessonPeriod);
    } 
  },

  render() {
    if ( !this.state.family || !this.state.form || !this.state.lessonPeriods || !this.state.appSettings) {
      return (<Loading message="App"/>)
    }

    return (
      <div>
        <Header {...this.state}
                {...this.props}
                toggleCreating={this.toggleCreating} />

        {
          this.props.hasSubmitted && new Date() > new Date(this.props.appSettings["submissionDeadline"].value)
            ? <AlreadySubmitted {...this.state}
                                {...this.props} /> 
            : <Body {...this.state}
                    {...this.props}
                    toggleConfirming={this.toggleConfirming}
                    toggleCreating={this.toggleCreating}
                    passLessonCount={this.adjustLessonCount} 
                    editWeek={this.editWeek}
                    createLessonPeriod={this.createLessonPeriod}
                    editLessonPeriod={this.editLessonPeriod}
                    deleteLessonPeriod={this.deleteLessonPeriod} 
                    submitForm={this.submitForm} />
        }
      </div>
    )
  }
});