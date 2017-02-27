require "rails_helper"

RSpec.describe Form, :type => :model do

  let(:family)     { create(:family) }
  let(:instrument) { create(:instrument) }
  let(:teacher)    { create(:teacher) }
  let(:form)       { family.find_or_create_current_form }
  let!(:student) do
    student = form.students.create( student_name:   "Susan", 
                                    instrument_id:  instrument.id,
                                    teacher_id:     teacher.id,
                                    start_date:     Date.new(2017, 6, 5),
                                    end_date:       Date.new(2017, 9, 1))
    student.save
    return student       
  end

  it "belongs to a family" do
    expect(form).to respond_to(:family) 
  end

  it "has many students" do 
    expect(form).to respond_to(:students)
    expect(form.students.length).to eq(1)
  end

  it "has a unique year" do 
    old_form = form
    new_form = family.forms.create(year: Date.today.year)
    expect(new_form).to_not be_valid
    expect(new_form.errors.messages[:year]).to include("must be unique")
  end

  it "can update its lesson count from its weeks" do
    # before initial update
    expect(form.lesson_count).to eq(0)
    # after inital update with all lessons selected (default)
    form.update_lesson_count
    expect(form.lesson_count).to eq(student.weeks.length)

    # update lesson count after unchecking a lesson
    old_count = student.weeks.length
    student.weeks.last.update_attribute(:lesson, false)
    form.update_lesson_count
    expect(form.lesson_count).to_not eq(old_count)
  end

  it "sorts its students" do
    initial_index = form.students.index(student)
    new_student = form.students.create(  student_name:   "Jimmy", 
                            instrument_id:  instrument.id,
                            teacher_id:     teacher.id,
                            start_date:     Date.new(2017, 6, 5),
                            end_date:       Date.new(2017, 9, 1))
    new_student_index = form.students.index(new_student)

    expect(new_student_index).to_not eq(initial_index)
    expect(new_student_index).to be > initial_index
  end

end