require 'rails_helper'
include ControllerHelpers

RSpec.describe Api::V1::InstrumentsController, :type => :controller do
  
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

    it "requires a signed in family" do
      expect(subject.current_user).to_not be_nil
      expect(subject.current_user).to eq(family)

      sign_out family
      get :index, format: :json
      expect(response.body).to include("You need to sign in or sign up before continuing.")
    end

    describe "index" do
      it "returns a list of all Instruments" do
        get :index, format: :json
        expect(response_body).to include( JSON.parse(instrument.to_json) )

        instruments = Instrument.all
        expect(response_body.length).to eq(instruments.length)
      end
    end

  end

end