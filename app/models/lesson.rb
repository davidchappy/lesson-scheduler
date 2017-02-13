class Lesson < ApplicationRecord
	belongs_to :form
	belongs_to :teacher
	belongs_to :students
	belongs_to :instrument
end
