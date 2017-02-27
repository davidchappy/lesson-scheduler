require "rails_helper"

RSpec.describe Family, :type => :model do

  let(:family)     { create(:family) }
  let(:instrument) { create(:instrument) }
  let(:teacher)    { create(:teacher) }
  let(:form)       { family.find_or_create_current_form }
  let!(:student) do
    student = form.students.create( student_name:   "Susan", 
                                    instrument_id:  instrument.id,
                                    teacher_id:     teacher.id,
                                    start_date:     Date.yesterday,
                                    end_date:       Date.today)
    student.save
    return student       
  end

  it "has many forms" do
    expect(family).to respond_to(:forms)
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

  it "can update its student count from its form" do
    expect(family.student_count).to eq(0)
    family.update_student_count(form)
    expect(family.student_count).to_not eq(0)
  end

end