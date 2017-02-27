FactoryGirl.define do
  factory :family do
    student_count 0
    first_name "John"
    last_name "Smith"
    sequence :email do |n|
      "family#{n}@example.com"
    end
    password "password"
    password_confirmation "password"
  end

  factory :instrument do
    sequence :name do |n|
      "instrument-#{n}"
    end
  end

  factory :teacher do
    first_name "Fred"
    last_name "Mertz"
    instrument
  end

end