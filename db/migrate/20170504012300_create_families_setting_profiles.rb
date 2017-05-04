class CreateFamiliesSettingProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :setting_profiles_users do |t|
      t.belongs_to :family,           index: true
      t.belongs_to :setting_profile,  index: true
    end
  end
end
