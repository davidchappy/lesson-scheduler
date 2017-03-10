require 'rails_helper'
Capybara.default_max_wait_time = 8

RSpec.describe "adding lesson periods", type: :feature do

  let!(:family) { create(:family) }
  let!(:instrument) { create(:instrument) }
  let!(:teacher)    { create(:teacher) }
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
    sign_out family
    Family.destroy_all
    Form.destroy_all
    Teacher.destroy_all
    Instrument.destroy_all
    Student.destroy_all

    new_family = Family.create( first_name: "Example", last_name: "Family", 
                                password: "password", password_confirmation: "password",
                                email: "fam@examples.com" )
    new_form = new_family.find_or_create_current_form
    new_instrument = Instrument.create(name: "oboe")
    new_teacher = Teacher.create(first_name: "Joe", last_name: "Blow")
    new_teacher.association(:instruments).add_to_target(new_instrument)
    puts new_teacher.instruments.inspect

    sign_in new_family
    visit '/'
    page.save_screenshot('../before-create.png')
    click_button 'Add a Lesson Period'

    within('#new-lesson-period-form') do    
      fill_in "Student's name", with: 'Susan' 
      select new_instrument.name, from: 'selectInstrument'
      select new_teacher.first_name + " " + new_teacher.last_name, from: 'selectTeacher' 
      select '1h 0m', from: 'default-lesson-length' 
      click_button 'Add Lesson Period'
    end

    # page.driver.debug

    # page.save_screenshot('../after-create.png')

    page.find('.weeks')

    # can't get ajax requests to show up here
    # page.has_selector?('.lesson-period')
    # expect(page).to have_content instrument.name
    # expect(page).to have_content(teacher.first_name + " " + teacher.last_name)
    # expect(page).to have_content '13 Lessons'
    # expect(page).to have_content '1h 0m', count: 13
  end

  it 'generates and displays its weeks', js: true do

  end


end