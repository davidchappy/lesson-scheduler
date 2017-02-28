FactoryGirl.define do
  factory :family do
    first_name "Jane"
    last_name "Johnson"
    sequence :email do |n|
      "family#{n}@example.com"
    end
    password "password"
    password_confirmation "password"
  end

  factory :student do
    name "Billy"
    family
  end
 
  factory :instrument do
    sequence :name do |n|
      "instrument-#{n}"
    end
  end

  factory :teacher do
    first_name "Fred"
    last_name "Mertz"
  end

end