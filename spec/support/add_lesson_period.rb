def add_lesson_period
  click_button 'Add a Lesson Period'
  within('#new-lesson-period-form') do    
    fill_in "Student's name", with: 'Susan' 
    select instrument.name, from: 'selectInstrument'
    select teacher.first_name + " " + teacher.last_name, from: 'selectTeacher' 
    select '1h 0m', from: 'default-lesson-length' 
    click_button 'Add Lesson Period'
  end
end
