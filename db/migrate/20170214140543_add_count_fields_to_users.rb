class AddCountFieldsToUsers < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :form_count, :integer, default: 0
    add_column :users, :week_count, :integer, default: 0
  end
end
