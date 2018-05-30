var App = React.createClass({

  // *** APP INIT
  getInitialState() {
    return {  instruments: undefined, teachers: undefined,
              family: undefined, form: undefined, students: undefined,
              lessonPeriods: undefined, allWeeks: undefined, isCreating: false,
              isConfirming: false, isSubmittable: false, appSettings: undefined,
              pricingData: undefined, isThanking: false, settingProfiles: undefined,
              loading: false }
  },

  componentDidMount() {
    $(document).ajaxStart(function() {
      $("#loading-overlay").show();
    });
    $(document).ajaxStop(function() {
      $("#loading-overlay").hide();
    });
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
        var pricingData = Pricer.getPricingData(response.lesson_periods,
                                                response.weeks,
                                                response.app_settings)
        // window.flash_messages.printMessages(response.messages);
        this.setState({
                        loading: false,
                        instruments: response.instruments,
                        teachers: response.teachers,
                        family: response.family,
                        form: response.form,
                        students: response.students,
                        lessonPeriods: response.lesson_periods,
                        allWeeks: response.weeks,
                        isSubmittable: isSubmittable,
                        appSettings: response.app_settings,
                        contentEntries: response.content_entries,
                        pricingData: pricingData,
                        settingProfiles: response.setting_profiles
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


  // *** ACTIONS ***
  submitForm(e) {
    e.preventDefault();
    // Ensure the form record has the current total cost
    var id = this.state.form.id;
    var total = Pricer.monetize(this.state.pricingData.currentPricing.totalOwed);
    // Reload to Thankyou view.
    this.setState({ isConfirming: false, isThanking: true });
    console.log("Pricing data: ", this.state.pricingData);
    $.ajax({
      url: `/api/v1/forms/${id}.json`,
      type: 'PUT',
      data: { form: { total_cost: total, pricing_data: this.state.pricingData } }
    });
  },

  toggleLock(bool, lessonPeriod) {
    lessonPeriod.locked = bool;
    var student = Helper.findInArrayById(lessonPeriod.student_id, this.state.students);
    this.editLessonPeriod(  student.name,
                            lessonPeriod.instrumentId,
                            lessonPeriod.teacherId,
                            lessonPeriod);
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

      // update pricing
      var pricingData = Pricer.getPricingData(lessonPeriods, allWeeks,
                                              this.state.appSettings)

      this.setState({ lessonPeriods: lessonPeriods, allWeeks: allWeeks, pricingData: pricingData })
      var total = Pricer.monetize(pricingData.currentPricing.totalOwed);

      $.ajax({
        url: `/api/v1/weeks/${week.id}.json`,
        type: 'PUT',
        data: { lesson: week.lesson, lesson_length: week.lesson_length, total_owed: total },
        success: (response) => {console.log(response)}
      });
    } else {
      this.toggleLock(true, lessonPeriod);
    }
  },

  addSettingsCode(code) {
    $.ajax({
      url: `/api/v1/families/${this.state.family.id}.json`,
      type: 'PUT',
      data: {
              family: {
                code: code
              }
            },
      success: (response) => {
        location.reload();
      }
    });
  },

  removeCodeFromFamily(id, family) {
    $.ajax({
      url: `/api/v1/families/${family.id}.json`,
      type: 'PUT',
      data: {
              family: {
                code_id: id
              }
            },
      success: (response) => {
        this.fetchAppData();
      }
    });
  },

  render() {
    if ( !this.state.family || !this.state.form || !this.state.lessonPeriods || !this.state.appSettings) {
      return (<Loading message="App"/>)
    }

    var submissionDeadline = new Date(this.state.appSettings["submissionDeadline"].value);

    return (
      <div>
        <Header {...this.state}
                {...this.props}
                toggleCreating={this.toggleCreating} />

        {
          this.state.form.submitted && new Date() > submissionDeadline && !this.props.admin
            ? <AlreadySubmitted {...this.state}
                                {...this.props} />
            : <Body {...this.state}
                    {...this.props}
                    toggleConfirming={this.toggleConfirming}
                    toggleCreating={this.toggleCreating}
                    editWeek={this.editWeek}
                    createLessonPeriod={this.createLessonPeriod}
                    editLessonPeriod={this.editLessonPeriod}
                    deleteLessonPeriod={this.deleteLessonPeriod}
                    submitForm={this.submitForm}
                    addSettingsCode={this.addSettingsCode}
                    removeCodeFromFamily={this.removeCodeFromFamily} />
        }

        <Loading loading={this.state.loading}/>
      </div>
    )
  }
});