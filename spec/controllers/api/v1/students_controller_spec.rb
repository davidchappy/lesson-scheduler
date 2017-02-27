require 'rails_helper'
include ControllerHelpers

RSpec.describe Api::V1::StudentsController, :type => :controller do
  
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
    let(:form)       { family.find_or_create_current_form }
    let(:student) do
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

    it "requires a signed in family" do
      expect(subject.current_user).to_not be_nil
      expect(subject.current_user).to eq(family)

      sign_out family
      get :index, format: :json
      expect(response.body).to include("You need to sign in or sign up before continuing.")
    end

    describe "show" do
      it "returns an array with a student, instrument, teacher, and teacher's unavailable dates" do
        unavailable_dates = teacher.unavailable_dates        
        params = { id: student.id }
        get :show, format: :json, params: params

        expect(response_body).to include( JSON.parse(teacher.to_json) )
        expect(response_body).to include( JSON.parse(instrument.to_json) )
        expect(response_body).to include( JSON.parse(student.to_json) )
        expect(response_body).to include( JSON.parse(unavailable_dates.to_json) )
      end
    end

    describe "create" do
      it "creates a new student for the current form" do
        students_initial = Student.all
        expect(students_initial.length).to eq(0)
        params = {  
          student: { student_name: "Bobby", teacher_id: teacher.id, 
                    instrument_id: instrument.id, form_id: form.id } 
        }
        post :create, format: :json, params: params
        expect(response_body["form_id"]).to eq(form.id)
        expect(students_initial.length).to_not eq(Student.all.length)
        expect(Student.all.length).to eq(1)
      end
    end

    describe "update" do
      it "updates a student with attributes in params" do
        student_original = student
        params = { 
          student: {  student_name: "New Name", teacher_id: teacher.id, 
                      instrument_id: instrument.id, form_id: form.id },
          id: student.id
        }
        put :update, format: :json, params: params
        id = response_body["id"]
        student_updated = Student.find(id)
        expect(student_updated.student_name).to eq("New Name")
        expect(student_original.student_name).to_not eq(student_updated.student_name)
      end
    end

    describe "destroy" do
      it "deletes a student and removes it from its form" do
        student_original = student
        original_length = Student.all.length
        params = { id: student.id }
        delete :destroy, format: :json, params: params

        expect(Student.all).to_not include(student_original)
        expect(Student.all.length).to_not eq(original_length)
      end
    end

  end

end