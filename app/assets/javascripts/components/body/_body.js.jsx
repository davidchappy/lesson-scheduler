var Body = React.createClass({

  passLessonCount(count, lessonPeriod) {
    lessonPeriod.lesson_count = count;

    // update the lessonPeriods array
    var lessonPeriods = this.props.lessonPeriods;
    var index; 
    lessonPeriods.map( (l, i) => {
      index = l.id === lessonPeriod.id ? i : index;
    });
    lessonPeriods[index] = lessonPeriod;

    this.props.passLessonCount(lessonPeriods);
  },
  
  render() {
    if ( !this.props.lessonPeriods ) {
      return (<Loading message="Lesson Periods.." />)
    }

    var lessonPeriods = this.props.lessonPeriods.map((lessonPeriod) => {
      // ensure lessonPeriod is correctly locked/unlocked
      var weeks = this.props.allWeeks[lessonPeriod.id];
      var lessonMinimumState = Helper.checkLessonMinimum( lessonPeriod, 
                                                          weeks, 
                                                          this.props.appSettings.lessonMinimum.value);
      if(lessonMinimumState === 1) {
        lessonPeriod.locked = false;
      } else {
        lessonPeriod.locked = true;
      }

      return (
        <LessonPeriod key={lessonPeriod.id} 
                      lessonPeriod={lessonPeriod} 
                      {...this.props}
                      updateLessonCount={this.passLessonCount}
                      toggleLock={this.toggleLock} />
      )
    });

    var submitDisabled = this.props.isSubmittable ? false : true;
    var tutorial = this.props.lessonPeriods.length ? false : true;
    var tutorialAttributes = {};
    if(tutorial) {
      tutorialAttributes = {
        "data-tip": "",
        "data-for": "ttLessonPeriodTutorial"
      }
    }

    return (
      <div className="wrapper">
        <div className="body container">      
          {
            this.props.isConfirming 
              ? <Confirmation {...this.props} /> 
              : <div>
                  <div className="lesson-periods row">
                    {lessonPeriods}
                    {
                      this.props.isCreating 
                        ? <NewLessonPeriod  {...this.props} /> 
                        : <div className="new-lesson-period-button col-sm-6 col-md-4">
                            <button id="add-lesson-period" className={"btn btn-default add-lesson-period"} 
                              onClick={this.props.toggleCreating} {...tutorialAttributes} >
                              <span className="glyphicon glyphicon-plus" aria-hidden="true"></span> 
                              <span className="button-text">Add a Lesson Period</span>
                            </button>
                          </div>
                    }
                    {
                      tutorial
                        ? <ReactTooltip id="ttLessonPeriodTutorial" type='dark' 
                                        effect='solid' place='left' className="tt-tutorial">
                            <LessonPeriodTutorial />
                          </ReactTooltip> 
                        : null
                    }
                    
                  </div>
                  <div className="submit-form row">
                    <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                      <button className="btn btn-primary submit-form-button" disabled={submitDisabled}
                              onClick={this.props.toggleConfirming}>Submit Form</button>
                    </div>
                  </div>
                </div>
          } 
        </div>
      </div>
    )
  }
});