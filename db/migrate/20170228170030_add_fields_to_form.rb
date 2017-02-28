class AddFieldsToForm < ActiveRecord::Migration[5.0]
  def change
    add_column    :forms, :start_date, :date
    add_column    :forms, :end_date, :date
    add_column    :forms, :student_count, :integer
    add_column    :forms, :total_cost, :integer

    remove_column :forms, :family_id, :integer

    add_reference :forms, :family, index: true
  end
end
