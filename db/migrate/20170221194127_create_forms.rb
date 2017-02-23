class CreateForms < ActiveRecord::Migration[5.0]
  def change
    create_table :forms do |t|
      t.integer :year
      t.timestamp :submitted_at
      t.integer :family_id
      t.boolean :submitted

      t.timestamps
    end
  end
end
