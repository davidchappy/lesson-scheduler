class Family < User
	has_many :forms

  def find_or_create_current_form
    form = Form.where(year: Date.today.year, family_id: self.id).first
    form = self.forms.create(year: Date.today.year, family_id: self.id) if form.nil?  
    return form
  end

  def update_student_count(form)
    if form.students
      self.student_count = form.students.length
      self.save
    end
  end

end