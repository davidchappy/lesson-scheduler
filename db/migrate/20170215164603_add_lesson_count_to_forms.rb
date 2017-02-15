class AddLessonCountToForms < ActiveRecord::Migration[5.0]
  def change
    add_column :forms, :lesson_count, :integer
  end
end
