class CreateLessonPeriods < ActiveRecord::Migration[5.0]
  def change
    create_table :lesson_periods do |t|
      t.references :student, foreign_key: true
      t.references :teacher, foreign_key: true
      t.references :instrument, foreign_key: true
      t.references :form, foreign_key: true
      t.integer :lesson_count
      t.integer :default_lesson_length, default: 30

      t.timestamps
    end
  end
end
