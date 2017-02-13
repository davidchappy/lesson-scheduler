class Form < ApplicationRecord
	belongs_to :summer
	belongs_to :student
	belongs_to :teacher
	has_many :lessons

  def stringify_week(week, index, divider='-')
    start = ActiveSupport::Inflector.ordinalize(week.start_date.day)
    finish = ActiveSupport::Inflector.ordinalize(week.end_date.day)
    wk_string = week.start_date.strftime("%b #{start}")
    wk_string += divider
    wk_string += week.end_date.strftime("%b #{finish}")
  end
end
