class InstrumentsTeachers < ApplicationRecord
  belongs_to :teacher
  belongs_to :instrument

  validates_uniqueness_of :instrument_id, scope: :teacher_id
end
