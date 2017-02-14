class Teacher < ApplicationRecord
  include ApplicationHelper

  has_many :forms
	belongs_to :instrument
end
