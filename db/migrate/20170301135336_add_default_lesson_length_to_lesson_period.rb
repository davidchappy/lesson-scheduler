class AddDefaultLessonLengthToLessonPeriod < ActiveRecord::Migration[5.0]
  def change
    change_column_default :lesson_periods, :default_lesson_length, 30
  end
end
