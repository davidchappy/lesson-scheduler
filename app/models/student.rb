class Student < ApplicationRecord
  include ApplicationHelper

  validates   :name, uniqueness: true

  belongs_to  :family
  has_many    :lesson_periods, dependent: :destroy
  has_many    :instruments, through: :lesson_periods
  has_many    :teachers, through: :lesson_periods
  has_many    :forms, through: :lesson_periods

end
