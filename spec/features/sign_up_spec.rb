require 'rails_helper'

RSpec.describe "the signup process", type: :feature do

  before(:each) do
    visit '/users/sign_up'
  end

  it "signs up a family user" do
    expect(page).to have_content 'Sign up'
    expect(page).to have_content 'Log in'

    within("#new_user") do
      fill_in 'First name', with: 'Jane'
      fill_in 'Last name', with: 'Doe'
      fill_in 'Email', with: 'new-family@example.com'
      fill_in 'Password', with: 'password'
      fill_in 'Password confirmation', with: 'password'
    end

    expect { click_button 'Sign up' }.to change{User.all.length}.from(0).to(1)
    expect(User.first.type).to eq("Family")
    expect(current_path).to eq('/')
  end

  it "requires all fields be filled in" do
    within("#new_user") do
      fill_in 'First name', with: ''
      fill_in 'Last name', with: ''
      fill_in 'Email', with: ''
      fill_in 'Password', with: ''
      fill_in 'Password confirmation', with: ''
    end

    click_button 'Sign up'

    expect(current_path).to eq('/users')
    expect(page).to have_content "First name can't be blank"
    expect(page).to have_content "Last name can't be blank"
    expect(page).to have_content "Email can't be blank"
    expect(page).to have_content "Password can't be blank"
  end

  it "requires a password with at least 6 characters" do
    within("#new_user") do
      fill_in 'First name', with: 'Jane'
      fill_in 'Last name', with: 'Doe'
      fill_in 'Email', with: 'new-family@example.com'
      fill_in 'Password', with: 'pass'
      fill_in 'Password confirmation', with: 'pass'
    end

    click_button 'Sign up'

    expect(current_path).to eq('/users')
    expect(page).to have_content "Password is too short"
  end
end