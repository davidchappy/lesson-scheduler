class Teacher < ApplicationRecord
  include ApplicationHelper

  has_and_belongs_to_many   :instruments
  has_many                  :lesson_periods, dependent: :destroy
  has_many                  :forms, through: :lesson_periods
  has_many                  :students, through: :lesson_periods
  has_many                  :unavailable_weeks, dependent: :destroy
end
