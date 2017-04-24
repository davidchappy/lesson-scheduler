class AddDescriptionAndKeyValueToAppSetting < ActiveRecord::Migration[5.0]
  def change
  	add_column :app_settings, :description, :string 
  	add_column :app_settings, :key, :string
  end
end
