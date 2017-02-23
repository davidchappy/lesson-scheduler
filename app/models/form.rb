class Form < ApplicationRecord
  validates :year, uniqueness: true

  belongs_to :family
  has_many :students
end
