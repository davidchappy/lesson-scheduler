require 'rails_helper'

RSpec.describe "adding lesson periods", type: :feature do

  let!(:family) { create(:family) }
  let!(:instrument) { create(:instrument) }
  let!(:teacher)    do 
    teacher = create(:teacher)
    teacher.instruments << instrument
    teacher
  end
  let!(:student)    { create(:student) }
  let(:form)       { family.find_or_create_current_form }

  before :each do
    login_as(family, scope: :user)
    visit '/'
  end

  it 'provides the necessary buttons and fields', js: true do
    expect(page).to have_content 'Add a Lesson Period'
    
    click_button 'Add a Lesson Period'
    expect(page).to have_field "Student's name"
    expect(page).to have_selector "#selectInstrument"
    expect(page).to have_selector "#selectTeacher"
    expect(page).to have_selector "#default-lesson-length"
    expect(page).to have_selector "#submit-new-lesson-period"
  end

  it 'disables fields when previous field is empty', js: true do    
    click_button 'Add a Lesson Period'
    within('#new-lesson-period-form') do
      expect(page).to have_selector "#selectInstrument:disabled"
      expect(page).to have_selector "#selectTeacher:disabled"
      expect(page).to have_selector "#default-lesson-length:disabled"
      expect(page).to have_selector "#submit-new-lesson-period:disabled"

      fill_in "Student's name", with: 'Jimmy' 
      expect(page).to_not have_selector "#selectInstrument:disabled"
      
      select instrument.name, from: 'selectInstrument'
      expect(page).to_not have_selector "#selectTeacher:disabled"

      select teacher.first_name + " " + teacher.last_name, from: 'selectTeacher' 
      expect(page).to_not have_selector "#default-lesson-length:disabled"

      select '45m', from: 'default-lesson-length' 
      expect(page).to_not have_selector "#submit-new-lesson-period:disabled"
    end
  end

  it 'shows only teachers that match the selected instrument', js: true do
  end

  it 'shows all instruments', js: true do
    click_button 'Add a Lesson Period'
    within('#selectInstrument') do
      expect(page).to have_selector 'option.instrument', count: 1
    end

    new_instrument = create(:instrument)
    visit '/'
    click_button 'Add a Lesson Period'
    within('#selectInstrument') do
      expect(page).to have_selector 'option.instrument', count: 2
    end
  end

  it 'successfully submits a new lesson period', js: true do
    expect(LessonPeriod.count).to eq(0)

    add_lesson_period
    wait_for_server

    expect(LessonPeriod.count).to eq(1)
    lesson_period = LessonPeriod.first
    expect(lesson_period.teacher).to eq(teacher)
    expect(lesson_period.instrument).to eq(instrument)
    expect(lesson_period.form).to eq(form)
    expect(lesson_period.student).to eq(family.students.first)
  end

  it 'generates and displays its weeks', js: true do
    add_lesson_period
    wait_for_server

    expect(LessonPeriod.count).to eq(1)
    lesson_period = LessonPeriod.first
    expect(lesson_period.weeks.length).to be > 0
    expect(lesson_period.weeks.length).to eq(13)
  end

end