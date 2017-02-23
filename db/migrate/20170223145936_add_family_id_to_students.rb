class AddFamilyIdToStudents < ActiveRecord::Migration[5.0]
  def change
    add_column :students, :family_id, :integer
  end
end
