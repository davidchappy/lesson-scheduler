class Teacher < ApplicationRecord
  include ApplicationHelper
  
  has_many :students
	belongs_to :instrument
  serialize :unavailable_dates, Array
end
