var App = React.createClass({
  getInitialState() {
    return {  family: undefined, form: undefined, students: undefined, 
              lessonPeriods: undefined, totalLessonCount: 0,
              addingLessonPeriod: false, alreadySubmitted: false }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => {
        if(response.form.submitted === true) {
          this.setState({ alreadySubmitted: true })
        }
        this.setState({ 
                        family: response.family,  
                        form: response.form,
                        lessonPeriods: response.lesson_periods,
                        students: response.students
                      });
        this.adjustLessonCount(response.lesson_periods);
        this.updatePricing();
      }
    });
  },
  toggleNewLessonPeriod() {
    // shows or hides add lesson period button
    var showLessonPeriod = this.state.addingLessonPeriod ? false : true;
    this.setState({ addingLessonPeriod: showLessonPeriod });
  },
  handleNewLessonPeriod(lessonPeriod, student) {
    // update app state lesson periods after creating new lesson period
    var lessonPeriods = this.state.lessonPeriods;
    lessonPeriods.push(lessonPeriod);
    this.setState({ lessonPeriods: lessonPeriods });

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
  handleEditedLessonPeriod(lessonPeriod, student) {
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
  handleDeletedLessonPeriod(lessonPeriod) {
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
                lessonPeriods={this.state.lessonPeriods}

                toggleNewLessonPeriod={this.toggleNewLessonPeriod}
                alreadySubmitted={this.state.alreadySubmitted} />

        {this.state.alreadySubmitted ? 

          <AlreadySubmitted submitted_at={this.state.form.submitted_at} /> :
          
          <Body form={this.state.form}
                students={this.state.students}
                lessonPeriods={this.state.lessonPeriods} 
                lessonCount={this.state.totalLessonCount} 
                addingLessonPeriod={this.state.addingLessonPeriod} 

                passLessonCount={this.adjustLessonCount} 
                handleSubmit={this.handleNewLessonPeriod}
                handleEdit={this.handleEditedLessonPeriod}
                handleDeletedLessonPeriod={this.handleDeletedLessonPeriod} 
                toggleNewLessonPeriod={this.toggleNewLessonPeriod} 
                submitForm={this.submitForm} />
        }
      </div>
    )
  }
});