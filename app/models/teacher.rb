class Teacher < ApplicationRecord
  include ApplicationHelper

	has_many :students, through: :forms
	has_many :forms
	has_many :lessons
	has_many :weeks
	belongs_to :instrument
end
