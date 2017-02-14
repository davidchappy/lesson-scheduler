module ApplicationHelper
  def full_name
    return self.first_name + " " + self.last_name
  end

  def stringify_week(week,divider='-')
    start = ActiveSupport::Inflector.ordinalize(week.start_date.day)
    finish = ActiveSupport::Inflector.ordinalize(week.end_date.day)
    wk_string = week.start_date.strftime("%b #{start}")
    wk_string += divider
    wk_string += week.end_date.strftime("%b #{finish}")
  end
end
