require "rails_helper"

RSpec.describe Family, :type => :model do

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

  it "has forms" do
    expect(family).to respond_to(:forms)
  end

  it "has students" do
    expect(family).to respond_to(:students)
  end

  it "has lesson periods (through forms)" do
    expect(family).to respond_to(:lesson_periods)
  end

  it "is a type of User" do
    expect(described_class).to be < User
    expect(family.type).to eq("Family")
  end

  it "can find or create this year's form" do
    expect(family).to respond_to(:find_or_create_current_form)
    expect(form.year).to eq(Date.today.year)
    expect(form).to be_a(Form) 
  end

end