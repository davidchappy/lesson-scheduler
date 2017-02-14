class AddWeekStringToWeeks < ActiveRecord::Migration[5.0]
  def change
    add_column :weeks, :week_string, :string
  end
end
