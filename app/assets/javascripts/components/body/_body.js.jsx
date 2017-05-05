var Body = React.createClass({

  getInitialState() {
    return({ code: undefined })
  },

  handleUpdateCode(e) {
    e.preventDefault();
    this.setState({ code: e.target.value });
  },

  handleSubmitCode(e) {
    e.preventDefault();
    this.props.addSettingsCode(this.state.code);
    this.setState({ code: undefined });
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

    var infoScreen = null;
    if(this.props.isConfirming) {
      infoScreen = <Confirmation {...this.props} />
    } else if (this.props.isThanking) {
      infoScreen = <ThankYou {...this.props} />
    }

    var activeCodes = this.props.family.setting_profiles.map((profile) => {
      var expiration = Helper.formatDate(new Date(profile.expiration));

      return (
                <li key={profile.id}>
                    <p>{profile.name} (Expires: {expiration})</p>
                </li>
              );
    })

    return (
      <div className="wrapper">
        <div className="body container">    
          {
            infoScreen != null 
              ? infoScreen 
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
                  <div className="insert-settings-code row">
                    <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                      <h4>Have a Code?</h4>
                      <p>If you have recieved a special code, please type it below and hit enter</p>
                      <form onSubmit={this.handleSubmitCode} id="addSettingsCode">
                        <input  type="text" 
                                onChange={this.handleUpdateCode}
                                placeholder="Insert Special Code" />
                      </form>
                    </div>
                  </div>
                  {
                    this.props.family.setting_profiles.length
                      ?  <div className="family-settings-list row">
                          <div className="col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                            <h5>Active Codes</h5>
                            <ul>
                              {activeCodes}
                            </ul>
                          </div>
                        </div>
                      : null
                  }
                </div> 
          } 
        </div>
      </div>
    )
  }
});