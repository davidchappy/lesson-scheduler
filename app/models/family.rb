class Family < User
	has_many :forms
  has_many :students
  has_many :lesson_periods, through: :forms

  def student_count
    return self.students.length
  end

  def find_or_create_current_form
    form =  self.forms.where(year: Date.today.year).first || 
            self.forms.create(year: Date.today.year, lesson_count: 0)
    return form
  end

end