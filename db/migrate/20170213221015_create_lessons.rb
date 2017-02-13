class CreateLessons < ActiveRecord::Migration[5.0]
  def change
    create_table :lessons do |t|
      t.integer :form_id
      t.integer :teacher_id
      t.integer :student_id
      t.integer :instrument_id
      t.integer :week_id

      t.timestamps
    end
  end
end
