class RemoveUnavailableDatesFromTeachers < ActiveRecord::Migration[5.0]
  def change
    remove_column :teachers, :unavailable_dates, :text
  end
end
