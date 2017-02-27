require 'rails_helper'
require "rspec/expectations"
require "rspec/json_expectations"

RSpec.describe Api::V1::FamiliesController, :type => :controller do
  # before(:all) do
  #   DatabaseCleaner.start
  # end

  context "anonymous user" do
    it "should be redirected to signin" do
      get :index
      expect(subject).to redirect_to(new_user_session_url)
    end
  end

  context "for a family user" do
    let!(:family)     { create(:family) }
    let!(:instrument) { create(:instrument) }
    let!(:teacher)    { create(:teacher) }
    let(:student) do
      form = family.forms.first
      form.students.create( student_name:   "Susan", 
                            instrument_id:  instrument.id,
                            teacher_id:     teacher.id,
                            start_date:     Date.yesterday,
                            end_date:       Date.today)
      student.form = form
      student.save                                 
    end

    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:family]
      sign_in family
    end

    it "should be signed_in after registering" do
      expect(subject.current_user).to_not be_nil
      expect(subject.current_user).to eq(family)
    end

    it "should find or create a form for the current year" do
      puts family.inspect
      get :index, format: :json
      expected = {
        family: family,
        students: [],
        form: family.forms.first        
      }.to_json
      expect(response.body).to eq(expected)      
    end

    it "it is updated before rendering" do
      # get :index
      # expect(response.length).to eq(3)
    end

  end

end