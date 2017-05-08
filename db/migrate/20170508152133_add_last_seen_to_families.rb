class AddLastSeenToFamilies < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :last_seen, :string
  end
end
