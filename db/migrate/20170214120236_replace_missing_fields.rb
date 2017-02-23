class ReplaceMissingFields < ActiveRecord::Migration[5.0]
  def change
    add_column :users,    :amount_owed,  :integer

    add_column :weeks,    :form_id,      :integer
    remove_column :weeks, :summer_id,    :integer
    remove_column :weeks, :teacher_id,   :integer
  end
end
