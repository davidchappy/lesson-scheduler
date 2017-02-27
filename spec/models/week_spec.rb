require "rails_helper"

RSpec.describe Week, :type => :model do

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

  it "belongs to a student" do
    week = student.weeks.last
    expect(week).to respond_to(:student) 
  end

  it "is destroyed when its student is destroyed" do
    week = student.weeks.last
    student.destroy
    expect(week.reload).to_not be_valid
  end

end