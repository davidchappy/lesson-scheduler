require 'rails_helper'

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

  it "belongs to a student" do
    expect(lesson_period).to respond_to(:student) 
  end

  it "belongs to a instrument" do
    expect(lesson_period).to respond_to(:instrument) 
  end

  it "belongs to a teacher" do
    expect(lesson_period).to respond_to(:teacher) 
  end

  it "belongs to a form" do
    expect(lesson_period).to respond_to(:form) 
  end

  it "has weeks" do
    expect(lesson_period).to respond_to(:weeks) 
    expect(lesson_period.weeks.length).to be > 0
  end

  it "generates weeks after being created" do
    new_lesson_period = form.lesson_periods.build(  student_id:student.id,
                                                    instrument_id: instrument.id,
                                                    teacher_id: teacher.id )
    expect(new_lesson_period.weeks).to be_empty
    new_lesson_period.save!
    expect(new_lesson_period.weeks).to_not be_empty
    expect(new_lesson_period.weeks.length).to eq(13)
  end

end