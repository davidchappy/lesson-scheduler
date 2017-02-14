class ReplaceMissingFields < ActiveRecord::Migration[5.0]
  def change
    add_column :users,    :amount_owed,  :integer

    add_column :forms,    :year,         :integer
    add_column :forms,    :start_date,   :date
    add_column :forms,    :end_date,     :date
    add_column :forms,    :student_name, :string
    add_column :forms,    :family_id,    :integer
    add_column :forms,    :instrument_id,:integer
    remove_column :forms, :summer_id,    :integer
    remove_column :forms, :student_id,   :integer

    add_column :weeks,    :form_id,      :integer
    remove_column :weeks, :summer_id,    :integer
    remove_column :weeks, :teacher_id,   :integer
  end
end
