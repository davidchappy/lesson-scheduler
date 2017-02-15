class Family < User
  before_create :set_amount_owed
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

  private

    def set_amount_owed
      self.amount_owed = 0
    end
end