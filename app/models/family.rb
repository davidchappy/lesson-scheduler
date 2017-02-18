class Family < User
  after_create :set_amount_owed
	has_many :forms

  def update_counts
    self.form_count = self.forms.length
    week_count = 0
    self.forms.each do |form| 
      form.weeks.map { |week| week_count += 1 if week.lesson == true }
    end
    self.week_count = week_count
    self.save
  end

  def update_amount_owed
    if self.forms.length > 0 
      owed = 0
      self.forms.each do |form|
        
      end
    end  

  end

  private

end