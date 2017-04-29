class AppSetting < ApplicationRecord
  validates :key, uniqueness: true
	serialize :value
end
