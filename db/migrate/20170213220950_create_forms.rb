class CreateForms < ActiveRecord::Migration[5.0]
  def change
    create_table :forms do |t|
      t.integer :summer_id
      t.integer :student_id
      t.integer :teacher_id

      t.timestamps
    end
  end
end
