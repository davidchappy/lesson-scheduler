require "rails_helper"

RSpec.describe Student, :type => :model do

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

  # it "belongs to a family" do
  #   expect(form).to respond_to(:family) 
  # end

  it "belongs to a form" do
    expect(student).to respond_to(:form) 
  end

  it "belongs to an instrument" do
    expect(student).to respond_to(:instrument) 
  end

  it "belongs to a teacher" do
    expect(student).to respond_to(:teacher) 
  end

  it "has many weeks" do 
    expect(student).to respond_to(:weeks)
    expect(student.weeks.length).to be > 0
  end

  it "has a unique student name" do 
    old_student = student
    new_student = form.students.create( student_name:   "Susan", 
                                        instrument_id:  instrument.id,
                                        teacher_id:     teacher.id,
                                        start_date:     Date.new(2017, 6, 5),
                                        end_date:       Date.new(2017, 9, 1))
    expect(new_student).to_not be_valid
    expect(new_student.errors.messages[:student_name]).to include("has already been taken")
  end

  it "sets start and end dates when initializing" do
    s = form.students.build(  student_name:   "Jimmy", 
                              instrument_id:  instrument.id,
                              teacher_id:     teacher.id,
                              form_id:        form.id)
    expect(s.year).to be_nil
    expect(s.start_date).to_not be_nil
    expect(s.end_date).to_not be_nil
  end

  it "generates weeks after being created" do
    s = Student.new(  student_name:   "Jimmy", 
                      instrument_id:  instrument.id,
                      teacher_id:     teacher.id,
                      form_id:        form.id,
                      start_date:     Date.new(2017, 6, 5),
                      end_date:       Date.new(2017, 9, 1))
    expect(s.weeks).to be_empty
    s.save!
    expect(s.weeks).to_not be_empty
    expect(s.weeks.length).to eq(13)
  end

end