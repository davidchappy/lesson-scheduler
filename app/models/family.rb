class Family < User

	has_many :students

  def update_counts
    self.student_count = self.students.length
    week_count = 0
    self.students.each do |student| 
      student.weeks.map { |week| week_count += 1 if week.lesson == true }
    end
    self.week_count = week_count
    self.save
  end

end