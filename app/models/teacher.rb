class Teacher < ApplicationRecord
  include ApplicationHelper
  
  has_many    :lesson_periods
  has_many    :students, through: :lesson_periods
  has_many    :forms, through: :lesson_periods
  has_many    :instruments, through: :lesson_periods
  serialize :unavailable_dates, Array
end
