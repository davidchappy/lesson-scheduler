FactoryGirl.define do
  factory :custom_setting do
    key "MyString"
    name "MyString"
    value "MyString"
    description "MyString"
    setting_profile nil
  end
  factory :setting_profile do
    code "MyString"
    expiration "2017-05-03"
  end
  factory :unavailable_week do
    start_date "2017-04-29"
    end_date "2017-04-29"
    teacher nil
  end
  factory :unavailable_date do
    value "MyString"
    teacher nil
  end
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