class Week < ApplicationRecord
	belongs_to :form, dependent: :destroy
end
