class CreateStudents < ActiveRecord::Migration[5.0]
  def change
    create_table :students do |t|
      t.integer :instrument_id
      t.string :first_name
      t.string :last_name
      t.integer :family_id

      t.timestamps
    end
  end
end
