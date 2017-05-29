class ContentEntry < ApplicationRecord
  validates :key, uniqueness: true
  serialize :value
end
