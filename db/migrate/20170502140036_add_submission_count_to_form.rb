class AddSubmissionCountToForm < ActiveRecord::Migration[5.0]
  def change
    add_column :forms, :submission_count, :integer, default: 0
  end
end
