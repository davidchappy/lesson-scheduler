require 'rails_helper'
include ControllerHelpers

RSpec.describe Api::V1::FamiliesController, :type => :controller do
  context "anonymous user" do
    it "should be redirected to signin" do
      get :index
      expect(subject).to redirect_to(new_user_session_url)
    end
  end

  context "family user" do
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

    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:family]
      sign_in family
    end

    describe "index" do

      it "requires a signed in family" do
        expect(subject.current_user).to_not be_nil
        expect(subject.current_user).to eq(family)

        sign_out family
        get :index, format: :json
        expect(response.body).to include("You need to sign in or sign up before continuing.")
      end

      it "returns the current family, form and students in JSON" do 
        form = family.forms.first
        form.update_lesson_period_count

        get :index, format: :json
        expected = {
          family: family,
          students: [student],
          form: family.forms.first        
        }.to_json
        expect( response_body ).to eq( JSON.parse(expected) )      
      end

      it "finds a form for the current year or creates a new one" do
        get :index, format: :json
        expect(family.forms.first.year).to eq(Date.today.year)

        family.forms.first.destroy
        get :index, format: :json
        expect(family.forms.first).to_not be_nil
        expect(family.forms.first.year).to eq(Date.today.year)[]
      end

      it "returns a sorted array of its current form's students" do
        # ensure new student always goes to end of array
        initial_student_array = family.forms.first.students
        new_student_array = initial_student_array
        new_student_array.create( student_name: "Jim",
                                      instrument_id:  instrument.id,
                                      teacher_id:     teacher.id,
                                      start_date:     Date.yesterday,
                                      end_date:       Date.today )
        expect(initial_student_array.first).to eq(new_student_array.first)

        # ensure students in json response is properly sorted 
        family.forms.first.students = new_student_array
        get :index, format: :json
        expect( response_body["students"] ).to eq( JSON.parse(new_student_array.to_json) )
      end

    end

  end

end