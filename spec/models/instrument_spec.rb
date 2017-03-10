require "rails_helper"

RSpec.describe Instrument, :type => :model do

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
    expect(instrument).to respond_to(:lesson_periods) 
    expect(instrument.lesson_periods.length).to be > 0
  end

  it "has teachers" do
    expect(instrument).to respond_to(:teachers) 
    expect(instrument.teachers.length).to be > 0
  end

  it "has students (through lesson periods)" do
    expect(instrument).to respond_to(:students) 
    expect(instrument.students.length).to be > 0
  end

  it "has forms (through lesson periods)" do
    expect(instrument).to respond_to(:forms) 
    expect(instrument.forms.length).to be > 0
  end

  it "has a unique name" do
    new_instrument = Instrument.create(name: instrument.name)
    expect(new_instrument).to_not be_valid
    expect(new_instrument.errors.messages[:name]).to include("has already been taken")
  end

end