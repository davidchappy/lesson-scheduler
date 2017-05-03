module ApplicationHelper
  def full_name
    return self.first_name + " " + self.last_name
  end

  def get_payments_from_total_string(total_string)
    total = ((total_string[1..-1].to_i * 100).to_f / 3) / 100
    payment_one = total.ceil(2) 
    payment_two = total.round(2) 
    payment_three = total.round(2)
    return [payment_one, payment_two, payment_three]
  end

  def parse_js_date_string(date_string)
    parts = date_string.split(" ")
    month         = parts[0]
    day           = parts[1][0..-2]
    year          = parts[2]
    return Date.parse(year + " " + month + " " + day)
  end

  def month_day_ordinal(date)
    day = ActiveSupport::Inflector.ordinalize(date.day)
    return date.strftime("%b #{day}")
  end

  def stringify_week(week, divider=' - ')
    start = month_day_ordinal(week.start_date)
    finish = month_day_ordinal(week.end_date)
    return start + divider + finish
  end

  def de_stringify_week(week_string, week={}, divider=' - ')
    parts = week_string.split(" - ")
    start_month = parts[0].split(" ")[0]
    start_day = parts[0].split(" ")[1][0...-2]
    end_month = parts[1].split(" ")[0]
    end_day = parts[1].split(" ")[1][0...-2]
    week["start_date"] = Date.strptime("#{start_month} #{start_day}", '%b %e')
    week["end_date"] = Date.strptime("#{end_month} #{end_day}", '%b %e')
    return week
  end

  def get_summer_weeks_as_strings(start_date=nil, end_date=nil)
    weeks = []
    summer_dates = get_summer_dates(start_date, end_date)
    summer_dates[0].step(summer_dates[1], 7) do |day|
      temp_week = Week.new
      temp_week.start_date = day
      temp_week.end_date = day + 4.days
      week_string = stringify_week(temp_week)
      weeks << week_string
    end
    return weeks
  end

  def get_summer_dates(start=nil, finish=nil, year=Date.today.year)
    start = start || Date.new(year, 6, 1)
    start += 1.days until start.wday == 1
    finish = finish || Date.new(year, 8, -1)
    if finish.wday < 5
      finish += 1.days until finish.wday == 5
    end
    return [start, finish]
  end

  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
end
