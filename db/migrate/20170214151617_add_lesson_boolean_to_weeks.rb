class AddLessonBooleanToWeeks < ActiveRecord::Migration[5.0]
  def change
    add_column :weeks, :lesson, :boolean, default: true
  end
end
