class CreateUnavailableDates < ActiveRecord::Migration[5.0]
  def change
    create_table :unavailable_dates do |t|
      t.date :value
      t.references :teacher, foreign_key: true

      t.timestamps
    end
  end
end
