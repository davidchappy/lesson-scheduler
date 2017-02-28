class ChangeReferenceOnWeek < ActiveRecord::Migration[5.0]
  def change
    remove_column :weeks, :student_id, :integer

    add_column    :weeks, :lesson_period_id, :integer, index: true
  end
end
