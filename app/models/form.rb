class Form < ApplicationRecord
  after_initialize :set_defaults, unless: :persisted?

	belongs_to :family
  belongs_to :instrument
  belongs_to :teacher
	has_many :weeks

  def set_defaults( year=Date.today.year, 
                            start=nil, 
                            finish=nil)

    self.year ||= year

    start = start || Date.new(year, 6, 1)
    start += 1.days until start.wday == 1
    self.start_date ||= start

    finish = finish || Date.new(2017, 8, -1)
    if finish.wday < 5
      finish += 1.days until finish.wday == 5
    end
    self.end_date ||= finish

    self.save
    Form.generate_weeks(self)
  end

  def stringify_week(week, index, divider='-')
    start = ActiveSupport::Inflector.ordinalize(week.start_date.day)
    finish = ActiveSupport::Inflector.ordinalize(week.end_date.day)
    wk_string = week.start_date.strftime("%b #{start}")
    wk_string += divider
    wk_string += week.end_date.strftime("%b #{finish}")
  end

  private

    def self.generate_weeks(form)
      start = form.start_date
      finish = form.end_date
      start.step(finish, 7) do |week|
        new_week = form.weeks.create
        new_week.start_date = week
        new_week.end_date = week + 4.days
        new_week.save
      end
    end

end
