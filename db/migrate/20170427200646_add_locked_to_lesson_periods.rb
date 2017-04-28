class AddLockedToLessonPeriods < ActiveRecord::Migration[5.0]
  def change
    add_column :lesson_periods, :locked, :boolean, default: false
  end
end
