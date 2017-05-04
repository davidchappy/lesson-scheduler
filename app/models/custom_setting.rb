class CustomSetting < ApplicationRecord
  belongs_to :setting_profile
  validates :name, uniqueness: {scope: :setting_profile, message: "You already defined that setting in this profile."}
end
