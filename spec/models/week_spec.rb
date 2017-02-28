require "rails_helper"

RSpec.describe Week, :type => :model do

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

  it "belongs to a lesson period" do
    week = lesson_period.weeks.last
    expect(week).to respond_to(:lesson_period) 
  end

  it "is destroyed when its student is destroyed" do
    week = lesson_period.weeks.last
    lesson_period.destroy
    expect(week.reload).to_not be_valid
  end

end