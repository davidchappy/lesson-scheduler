class Instrument < ApplicationRecord
	has_many :lessons
	has_many :teachers
	has_many :students
end
