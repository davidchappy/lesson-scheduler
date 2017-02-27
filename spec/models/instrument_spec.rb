require "rails_helper"

RSpec.describe Instrument, :type => :model do

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
    expect(instrument).to respond_to(:students) 
    expect(instrument.students.length).to be > 0
  end

  it "has teachers" do
    teacher.update_attribute(:instrument_id, instrument.id)
    expect(instrument).to respond_to(:teachers) 
    expect(instrument.teachers.length).to be > 0
  end

  it "has a unique name" do
    new_instrument = Instrument.create(name: instrument.name)
    expect(new_instrument).to_not be_valid
    expect(new_instrument.errors.messages[:name]).to include("has already been taken")
  end

end