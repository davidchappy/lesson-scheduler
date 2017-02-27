class Form < ApplicationRecord
  validate :unique_year, on: :create

  belongs_to :family
  has_many :students

  def update_lesson_count
    # get current lesson count from each week of this form's students
    lesson_count = 0
    self.students.each do |student| 
      student.weeks.map { |week| lesson_count += 1 if week.lesson == true }
    end
    self.lesson_count = lesson_count
    self.save
  end

  def sorted_students
    return self.students.sort_by { |student| student.created_at } || []
  end

  def unique_year
    if Form.all.any? { |form| form.year == self.year } 
      errors.add(:year, "must be unique")
    end
  end

end
