class Family < User
	has_many :forms, dependent: :destroy
  has_many :students, dependent: :destroy
  has_many :lesson_periods, through: :forms
  has_many :custom_settings, through: :setting_profiles
  has_and_belongs_to_many :setting_profiles

  def student_count
    return self.students.length
  end

  def find_or_create_current_form
    form =  self.forms.where(year: Date.today.year).take || 
            self.forms.create(year: Date.today.year, lesson_count: 0)
    check_for_alternate_start_date(form)
    return form
  end

end