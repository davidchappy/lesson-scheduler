class Form < ApplicationRecord
  validate :unique_year, on: :create

  belongs_to  :family
  has_many    :lesson_periods, dependent: :destroy
  has_many    :instruments, through: :lesson_periods
  has_many    :teachers, through: :lesson_periods
  has_many    :students, through: :lesson_periods

  before_create :set_summer_dates

  def set_summer_dates( year=Date.today.year, 
                            start=nil, 
                            finish=nil)
    self.year = year

    start = start || Date.new(year, 6, 1)
    start += 1.days until start.wday == 1
    self.start_date ||= start

    finish = finish || Date.new(2017, 8, -1)
    if finish.wday < 5
      finish += 1.days until finish.wday == 5
    end
    self.end_date ||= finish
  end

  def unique_year
    if Form.all.any? { |form| form.family == self.family && form.year == self.year } 
      errors.add(:year, "must be unique")
    end
  end

end
