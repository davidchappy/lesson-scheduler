class Week < ApplicationRecord
	belongs_to :lesson_period, dependent: :destroy
end
