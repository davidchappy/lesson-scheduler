FactoryGirl.define do
  factory :family do
    first_name "John"
    last_name "Smith"
    email "smiths@example.com"
    password "password"
    password_confirmation "password"
  end
end