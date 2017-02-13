class Student < ApplicationRecord
  include ApplicationHelper
	
	has_many :teachers, through: :forms
	has_many :forms
	has_many :lessons
	belongs_to :instrument
end
