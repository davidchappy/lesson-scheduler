class CreateWeeks < ActiveRecord::Migration[5.0]
  def change
    create_table :weeks do |t|
      t.integer :summer_id
      t.integer :teacher_id
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
