require "rails_helper"

RSpec.describe Student, :type => :model do

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
    expect(student).to respond_to(:family) 
  end

  it "has lesson periods" do
    expect(student).to respond_to(:lesson_periods) 
    expect(student.lesson_periods.length).to be > 0
  end

  it "has teachers (through lesson periods)" do
    expect(student).to respond_to(:teachers) 
    expect(student.teachers.length).to be > 0
  end

  it "has instruments (through lesson periods)" do
    expect(student).to respond_to(:instruments) 
    expect(student.instruments.length).to be > 0
  end

  it "has forms (through lesson periods)" do
    expect(student).to respond_to(:forms) 
    expect(student.forms.length).to be > 0
  end

  it "has a unique name" do 
    old_student = student
    new_student = family.students.create(name: old_student.name)
    expect(new_student).to_not be_valid
    expect(new_student.errors.messages[:name]).to include("has already been taken")
  end

end