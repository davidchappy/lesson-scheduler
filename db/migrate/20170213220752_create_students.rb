class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students do |t|
      t.integer :instrument_id
      t.string  :student_name
      t.integer :family_id
      t.integer :teacher_id
      t.date    :start_date
      t.date    :end_date
      t.integer :lesson_count

      t.timestamps
    end
  end
end
