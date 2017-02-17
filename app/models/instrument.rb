class Instrument < ApplicationRecord
	has_many :forms
	has_many :teachers

  validates :name, uniqueness: true
end
