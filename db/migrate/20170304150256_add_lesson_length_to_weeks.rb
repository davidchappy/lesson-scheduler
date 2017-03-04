class AddLessonLengthToWeeks < ActiveRecord::Migration[5.0]
  def change
    add_column :weeks, :lesson_length, :integer
  end
end
