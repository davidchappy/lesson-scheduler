class CreateSettingProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :setting_profiles do |t|
      t.string :code
      t.date :expiration

      t.timestamps
    end
  end
end
