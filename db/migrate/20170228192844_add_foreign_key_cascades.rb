class AddForeignKeyCascades < ActiveRecord::Migration[5.0]
  def change
    remove_foreign_key "lesson_periods", "forms"
    remove_foreign_key "lesson_periods", "instruments"
    remove_foreign_key "lesson_periods", "students"
    remove_foreign_key "lesson_periods", "teachers"

    add_foreign_key     :lesson_periods, :forms, on_delete: :cascade
  end
end
