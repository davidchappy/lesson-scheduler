class Student < ApplicationRecord
  include ApplicationHelper

  after_initialize :set_defaults
  after_create :generate_weeks

  validates :student_name, uniqueness: true

  belongs_to :form
  belongs_to :instrument
  belongs_to :teacher
	has_many :weeks

  def set_defaults( year=Date.today.year, 
                            start=nil, 
                            finish=nil)

    start = start || Date.new(year, 6, 1)
    start += 1.days until start.wday == 1
    self.start_date ||= start

    finish = finish || Date.new(2017, 8, -1)
    if finish.wday < 5
      finish += 1.days until finish.wday == 5
    end
    self.end_date ||= finish
  end

  private

    def generate_weeks
      start = self.start_date
      finish = self.end_date
      start.step(finish, 7) do |week|
        new_week = self.weeks.create
        new_week.start_date = week
        new_week.end_date = week + 4.days
        new_week.week_string = stringify_week(new_week)
        new_week.save
      end
      self.lesson_count = self.weeks.length
      self.save
    end

end
