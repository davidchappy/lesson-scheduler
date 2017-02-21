class ReplaceFormReferencesWithStudentReferences < ActiveRecord::Migration[5.0]
  def change
    rename_column :users, :form_count, :student_count
    rename_column :weeks, :form_id, :student_id
  end
end
