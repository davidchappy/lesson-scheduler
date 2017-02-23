class Family < User

	has_many :forms

  def update_counts
    current_form = Form.where(year: Date.today.year).first
    self.student_count = current_form.students.length
    week_count = 0
    current_form.students.each do |student| 
      student.weeks.map { |week| week_count += 1 if week.lesson == true }
    end
    self.week_count = week_count
    self.save
  end

end