class Instrument < ApplicationRecord
  validates :name, uniqueness: true

  has_many    :lesson_periods
  has_many    :forms, through: :lesson_periods
  has_many    :teachers, through: :lesson_periods
  has_many    :students, through: :lesson_periods
end
