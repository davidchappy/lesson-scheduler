require 'rails_helper'

RSpec.describe Api::V1::FormsController, :type => :controller do

  context "anonymous user" do
    it "should be redirected to signin" do
      get :index
      expect(subject).to redirect_to(new_user_session_url)
    end
  end

  context "family user" do

    let!(:family)     { create(:family) }
    let!(:instrument) { create(:instrument) }
    let!(:teacher)    { create(:teacher) }
    let!(:form)       { family.find_or_create_current_form }
    let!(:student) do
      student = form.students.create( student_name:   "Susan", 
                                      instrument_id:  instrument.id,
                                      teacher_id:     teacher.id,
                                      start_date:     Date.yesterday,
                                      end_date:       Date.today)
      student.form = form
      student.save
      return student       
    end

    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:family]
      sign_in family
    end

    describe "update" do
      it "requires a signed in family" do
        expect(subject.current_user).to_not be_nil
        expect(subject.current_user).to eq(family)

        sign_out family
        get :index, format: :json
        expect(response.body).to include("You need to sign in or sign up before continuing.")
      end

      it "marks a form as submitted" do
        expect(form.submitted).to be_nil
        expect(form.submitted_at).to be_nil
        params = { id: form.id }
        get :update, format: :json, params: params
        expect( JSON.parse(response.body)["submitted"] ).to eq(true)
        expect( JSON.parse(response.body)["submitted_at"] ).to_not be_nil
      end

    end

  end


end