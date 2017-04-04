require 'rails_helper'

RSpec.describe "the signin process", type: :feature do

  let(:family) { create(:family) }

  it "signs in a family user" do
    visit '/'
    expect(current_path).to eq('/users/sign_in')
    expect(page).to have_selector("input[type=submit][value='Log in']")
    expect(page).to have_content 'Email'
    expect(page).to have_content 'Password'
    expect(page).to have_content 'Sign up'

    within("#new_user") do
      fill_in 'Email', with: family.email
      fill_in 'Password', with: family.password
    end

    click_button 'Log in'
    expect(current_path).to eq('/')
  end

  it "requires valid credentials" do
    visit '/'
    within("#new_user") do
      fill_in 'Email', with: "wrong@email.com"
      fill_in 'Password', with: "notvalid"
    end
    click_button 'Log in'
    expect(current_path).to eq('/users/sign_in')
  end

  it "redirects a valid family user to the site view", js: true do
    login_as family
    visit '/'
    expect(page).to have_content 'The ' + family.last_name + ' Family'
  end

end