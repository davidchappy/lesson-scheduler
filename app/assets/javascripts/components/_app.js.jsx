var App = React.createClass({
  getInitialState() {
    return { family: undefined, lessonCount: 0 }
  },
  componentDidMount() {
    $.ajax({
      url: '/api/v1/families.json', 
      type: 'GET',
      success: (response) => { 
        this.setState({ family: response });
      }
    });
  },
  adjustLessonCount(count) {
    var currentCount = this.state.lessonCount;
    currentCount += count;
    this.setState({ lessonCount: currentCount })
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
        <Header family={this.state.family} lessonCount={this.state.lessonCount}/>
        <Body passLessonCount={this.adjustLessonCount}/>
      </div>
    )
  }
});