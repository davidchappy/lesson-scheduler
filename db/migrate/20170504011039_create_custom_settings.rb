class CreateCustomSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :custom_settings do |t|
      t.string :key
      t.string :name
      t.string :value
      t.string :description
      t.references :setting_profile, foreign_key: true

      t.timestamps
    end
  end
end
