require "rails_helper"

RSpec.describe Teacher, :type => :model do

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

  it "has students" do
    expect(teacher).to respond_to(:students) 
    expect(teacher.students.length).to be > 0
  end

  it "belongs to an instrument" do
    expect(teacher).to respond_to(:instrument) 
  end

  it "serializes its unavailable dates" do
    expect(teacher.unavailable_dates).to be_a(Array)
  end

end