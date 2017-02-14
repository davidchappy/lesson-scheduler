class DropLessons < ActiveRecord::Migration[5.0]
  def change
    drop_table :lessons
    drop_table :students
    drop_table :summers
  end
end
