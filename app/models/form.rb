class Form < ApplicationRecord
  include ApplicationHelper
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
    dates = get_summer_dates(start, finish, year)
    self.start_date ||= dates[0]
    self.end_date ||= dates[1]
  end

  def unique_year
    if Form.all.any? { |form| form.family == self.family && form.year == self.year } 
      errors.add(:year, "must be unique")
    end
  end

end
