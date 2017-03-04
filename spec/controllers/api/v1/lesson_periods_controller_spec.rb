require 'rails_helper'
include ControllerHelpers

RSpec.describe Api::V1::LessonPeriodsController, :type => :controller do
  
  context "anonymous user" do
    it "should be redirected to signin" do
      get :index
      expect(subject).to redirect_to(new_user_session_url)

      get :show, params: { id: 1 }
      expect(subject).to redirect_to(new_user_session_url)

      get :create
      expect(subject).to redirect_to(new_user_session_url)

      get :update, params: { id: 1 }
      expect(subject).to redirect_to(new_user_session_url)

      get :destroy, params: { id: 1 }
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

    describe "show" do
      it "returns an array with a lesson period, student, teacher, and instrument" do
        params = { id: lesson_period.id }
        get :show, format: :json, params: params

        expect(response_body["teacher"]).to include( JSON.parse(teacher.to_json) )
        expect(response_body["instrument"]).to include( JSON.parse(instrument.to_json) )
        expect(response_body["lesson_period"]).to include( JSON.parse(lesson_period.to_json) )
        expect(response_body["student"]).to include( JSON.parse(student.to_json) )
      end
    end

    describe "create" do
      it "creates a new lesson period for the current form" do
        lesson_periods_initial = LessonPeriod.all
        expect(lesson_periods_initial.length).to eq(1)
        params = { 
          family_id: family.id, 
          lesson_period: {  student_id: student.id,       teacher_id: teacher.id, 
                            instrument_id: instrument.id, form_id: form.id } 
        }
        post :create, format: :json, params: params
        expect(response_body["lesson_period"]["form_id"]).to eq(form.id)
        expect(lesson_periods_initial.length).to_not eq(LessonPeriod.all.length)
        expect(LessonPeriod.all.length).to eq(2)
      end
    end

    describe "update" do
      it "updates a student with attributes in params" do
        lesson_period_original = lesson_period
        new_student = family.students.create(name: "New Name")
        params = { 
          name: new_student.name,
          family_id: family.id,
          lesson_period: {  teacher_id: teacher.id, instrument_id: instrument.id, 
                            form_id: form.id, default_lesson_length: 30 },
          id: lesson_period.id
        }
        put :update, format: :json, params: params
        id = response_body["lesson_period"]["id"]
        lesson_period_updated = LessonPeriod.find(id)
        expect(lesson_period_updated.student.name).to eq("New Name")
        expect(lesson_period_original.student.name).to_not eq(lesson_period_updated.student.name)
      end
    end

    describe "destroy" do
      it "deletes a student and removes it from its form" do
        lesson_period_original = lesson_period
        original_length = LessonPeriod.all.length
        params = { id: lesson_period.id }
        delete :destroy, format: :json, params: params

        expect(LessonPeriod.all).to_not include(lesson_period_original)
        expect(LessonPeriod.all.length).to_not eq(original_length)
      end
    end

  end

end