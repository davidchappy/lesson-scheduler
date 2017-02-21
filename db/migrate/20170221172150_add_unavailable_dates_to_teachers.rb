class AddUnavailableDatesToTeachers < ActiveRecord::Migration[5.0]
  def change
    add_column :teachers, :unavailable_dates, :text
  end
end
