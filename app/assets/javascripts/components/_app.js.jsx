var App = React.createClass({
  getInitialState() {
    return { family: undefined, totalLessonCount: 0, forms: [] }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response[0], 
                        totalLessonCount: response[0].week_count, 
                        forms: response[1] });
      }
    });
  },
  adjustLessonCount(newCount, form) {
    // update the form and forms array
    form.lesson_count = newCount;
    console.log(form.lesson_count);
    var forms = this.state.forms;
    console.log(forms);
    var formIndex = forms.indexOf(form);
    forms[formIndex] = form;
    console.log(forms);

    // update the lesson count
    var newTotal = 0;
    forms.map((form) => {
      newTotal += form.lesson_count;
    });

    // set state with changes
    this.setState({ totalLessonCount: newTotal, forms: forms });
    console.log(this.state.totalLessonCount);
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
        <Header family={this.state.family} lessonCount={this.state.totalLessonCount} forms={this.state.forms}/>
        <Body passLessonCount={this.adjustLessonCount} forms={this.state.forms}/>
      </div>
    )
  }
});