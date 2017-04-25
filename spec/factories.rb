FactoryGirl.define do
  factory :instrument_teacher do
    
  end
  factory :app_setting do
    name "MyString"
    value "MyText"
  end
  factory :family do
    first_name "Jane"
    last_name "Johnson"
    sequence :email do |n|
      "family#{n}@example.com"
    end
    password "password"
    password_confirmation "password"
  end

  factory :form do
    family
    year Date.today.year
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

  factory :lesson_period do
    instrument
    teacher
    student
    form
  end

end