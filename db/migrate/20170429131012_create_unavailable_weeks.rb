class CreateUnavailableWeeks < ActiveRecord::Migration[5.0]
  def change
    create_table :unavailable_weeks do |t|
      t.date :start_date
      t.date :end_date
      t.references :teacher, foreign_key: true

      t.timestamps
    end
  end
end
