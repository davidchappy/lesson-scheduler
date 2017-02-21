class RenameFormsToStudents < ActiveRecord::Migration[5.0]
  def change
    rename_table :forms, :students
  end
end
