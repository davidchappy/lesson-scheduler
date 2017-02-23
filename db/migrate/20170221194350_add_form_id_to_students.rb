class AddFormIdToStudents < ActiveRecord::Migration[5.0]
  def change
    add_column :students, :form_id, :integer
  end
end
