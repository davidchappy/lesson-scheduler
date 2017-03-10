class TeachersInstrumentsAssociationTable < ActiveRecord::Migration[5.0]
  def change
    create_table :instruments_teachers, id: false do |t|
      t.belongs_to :instrument,  index: true
      t.belongs_to :teacher,     index: true
    end
  end
end
