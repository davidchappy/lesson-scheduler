class RemoveFamilyWeekCountAndAddToForm < ActiveRecord::Migration[5.0]
  def change
    remove_column :users, :week_count,    :integer
    add_column    :forms, :lesson_count,  :integer
  end
end
