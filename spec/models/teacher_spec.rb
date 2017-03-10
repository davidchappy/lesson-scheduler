require "rails_helper"

RSpec.describe Teacher, :type => :model do

  let(:family)     { create(:family) }
  let(:instrument) { create(:instrument) }
  let(:teacher)    do 
    teacher = create(:teacher)
    teacher.instruments << instrument
    teacher
  end  
  let(:student)    { create(:student) }
  let(:form)       { family.find_or_create_current_form }
  let!(:lesson_period) do
    lesson_period = form.lesson_periods.create( student_id:student.id,
                                                instrument_id: instrument.id,
                                                teacher_id: teacher.id )
    lesson_period.save
    return lesson_period       
  end

  it "has lesson periods" do
    expect(teacher).to respond_to(:lesson_periods) 
    expect(teacher.lesson_periods.length).to be > 0
  end

  it "has instruments (through lesson periods)" do
    expect(teacher).to respond_to(:instruments) 
    expect(teacher.instruments.length).to be > 0
  end

  it "has students (through lesson periods)" do
    expect(teacher).to respond_to(:students) 
    expect(teacher.students.length).to be > 0
  end

  it "has forms (through lesson periods)" do
    expect(teacher).to respond_to(:forms) 
    expect(teacher.forms.length).to be > 0
  end

  it "serializes its unavailable dates" do
    expect(teacher.unavailable_dates).to be_a(Array)
  end

end