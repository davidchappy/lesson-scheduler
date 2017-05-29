class CreateContentEntries < ActiveRecord::Migration[5.0]
  def change
    create_table :content_entries do |t|
      t.string :name
      t.text :value, default: ""
      t.string :description
      t.string :key
      t.integer :char_limit

      t.timestamps
    end
  end
end
