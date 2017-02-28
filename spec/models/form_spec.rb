require "rails_helper"

RSpec.describe Form, :type => :model do

  let(:family)     { create(:family) }
  let(:instrument) { create(:instrument) }
  let(:teacher)    { create(:teacher) }
  let(:student)    { create(:student) }
  let(:form)       { family.find_or_create_current_form }
  let!(:lesson_period) do
    lesson_period = form.lesson_periods.create( student_id:student.id,
                                                instrument_id: instrument.id,
                                                teacher_id: teacher.id )
    lesson_period.save
    return lesson_period       
  end


  it "belongs to a family" do
    expect(form).to respond_to(:family) 
  end

  it "has lesson periods" do 
    expect(form).to respond_to(:lesson_periods)
    expect(form.lesson_periods.length).to eq(1)
  end

  it "has teachers (through lesson periods)" do 
    expect(form).to respond_to(:teachers)
    expect(form.teachers.length).to eq(1)
  end

  it "has instruments (through lesson periods)" do 
    expect(form).to respond_to(:instruments)
    expect(form.instruments.length).to eq(1)
  end

  it "has students (through lesson periods)" do 
    expect(form).to respond_to(:students)
    expect(form.students.length).to eq(1)
  end

  it "has a unique year" do 
    old_form = form
    new_form = family.forms.create(year: Date.today.year)
    expect(new_form).to_not be_valid
    expect(new_form.errors.messages[:year]).to include("must be unique")
  end

  it "sets year, start and end dates before being created" do
    new_form = family.forms.build()
    expect(new_form.start_date).to be_nil
    expect(new_form.end_date).to be_nil
    expect(new_form.year).to be_nil

    new_form.save!
    expect(new_form.start_date).to_not be_nil
    expect(new_form.end_date).to_not be_nil
    expect(new_form.year).to eq(Date.today.year)
  end

  it "can update its lesson count from its weeks" do
    # before initial update
    expect(form.lesson_count).to eq(0)
    # after inital update with all lessons selected (default)
    form.update_lesson_count
    expect(form.lesson_count).to eq(lesson_period.weeks.length)

    # update lesson count after unchecking a lesson
    old_count = lesson_period.weeks.length
    lesson_period.weeks.last.update_attribute(:lesson, false)
    form.update_lesson_count
    expect(form.lesson_count).to_not eq(old_count)
  end

  it "can update its student count" do
    expect(form.student_count).to be_nil
    form.update_lesson_period_count
    expect(form.student_count).to_not be_nil
  end

  it "sorts its students" do
    initial_index = form.lesson_periods.index(lesson_period)
    new_student =   family.students.create(name: "Julie")
    new_lesson_period = form.lesson_periods.create( student_id: new_student.id,
                                                    instrument_id: instrument.id,
                                                    teacher_id: teacher.id )
    new_lesson_period_index = form.lesson_periods.index(new_lesson_period)

    expect(new_lesson_period_index).to_not eq(initial_index)
    expect(new_lesson_period_index).to be > initial_index
  end

end