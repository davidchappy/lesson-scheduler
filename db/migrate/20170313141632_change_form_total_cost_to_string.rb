class ChangeFormTotalCostToString < ActiveRecord::Migration[5.0]
  def change
    change_column :forms, :total_cost, :string
  end
end
