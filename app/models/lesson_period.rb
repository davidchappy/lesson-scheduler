class LessonPeriod < ApplicationRecord
  include ApplicationHelper

  belongs_to  :student, dependent: :destroy
  belongs_to  :form, dependent: :destroy
  belongs_to  :teacher
  belongs_to  :instrument
  has_many    :weeks

  after_create :generate_weeks

  private

    def generate_weeks
      start = self.form.start_date
      finish = self.form.end_date
      start.step(finish, 7) do |week|
        new_week = self.weeks.create
        new_week.lesson_length = self.default_lesson_length
        new_week.start_date = week
        new_week.end_date = week + 4.days
        new_week.week_string = stringify_week(new_week)
        new_week.save
      end
      self.lesson_count = self.weeks.length
      self.save
    end
end
