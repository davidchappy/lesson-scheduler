class AddunavailableWeeksToTeachers < ActiveRecord::Migration[5.0]
  def change
    add_column :teachers, :unavailable_weeks, :text
  end
end
