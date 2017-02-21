class Week < ApplicationRecord
	belongs_to :student, dependent: :destroy
end
