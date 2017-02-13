class CreateSummers < ActiveRecord::Migration[5.0]
  def change
    create_table :summers do |t|
      t.date :start_date
      t.date :end_date
      t.integer :year

      t.timestamps
    end
  end
end
