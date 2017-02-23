class ChangeFieldsOnFamilies < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :amount_owed, :integer
  end
end
