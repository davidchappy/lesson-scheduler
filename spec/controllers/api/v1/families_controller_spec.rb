require 'rails_helper'

RSpec.describe Api::V1::FamiliesController, :type => :controller do
  describe "anonymous user" do
    before :each do
      # This simulates an anonymous user
      login_with nil
    end

    it "should be redirected to signin" do
      get :index
      expect(response).to redirect_to(new_user_session_path)
    end
  end

  context "for a family user" do
    let!(:family) { create( :family ) }

    before :each do
      @request.env["devise.mapping"] = Devise.mappings[:family]
      sign_in family
    end

    it "should be signed_in after registering" do
      expect(subject.current_user).to_not be_nil
      expect(subject.current_user).to eq(family)
    end

    it "should find or create a form for the current year" do
      get :index, format: :json
      expected = {
        
      }
      expect(response.body.length).to eq(3)      
    end

    it "it is updated before rendering" do
      # get :index
      # expect(response.length).to eq(3)
    end

  end

end