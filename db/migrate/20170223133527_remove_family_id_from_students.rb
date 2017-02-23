class RemoveFamilyIdFromStudents < ActiveRecord::Migration[5.0]
  def change
    remove_column :students, :family_id, :integer
  end
end
