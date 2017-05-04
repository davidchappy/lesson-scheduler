class SettingProfile < ApplicationRecord
  has_many :custom_settings, dependent: :destroy
  has_and_belongs_to_many :families
end
