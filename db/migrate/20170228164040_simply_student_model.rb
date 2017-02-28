class SimplyStudentModel < ActiveRecord::Migration[5.0]
  def change
    remove_column :students, :teacher_id, :integer
    remove_column :students, :instrument_id, :integer
    remove_column :students, :form_id, :integer
    remove_column :students, :year, :integer
    remove_column :students, :start_date, :date
    remove_column :students, :end_date, :date
    remove_column :students, :lesson_count, :integer
    remove_column :students, :submitted, :boolean
    remove_column :students, :family_id, :integer

    add_reference :students, :family, index: true
    rename_column :students, :student_name, :name
  end
end
