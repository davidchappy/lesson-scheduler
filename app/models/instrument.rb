class Instrument < ApplicationRecord
	has_many :students
	has_many :teachers

  validates :name, uniqueness: true
end
