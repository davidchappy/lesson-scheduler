module ApplicationHelper
  def full_name
    return self.first_name + " " + self.last_name
  end

  def monetize(amount)
    return "$" + ((amount.to_i / 100).to_s)
  end

  def get_payments_from_total_string(total_string)
    total = ((total_string[1..-1].to_i * 100).to_f / 3) / 100
    p total
    payment_one = total.ceil_to(2) 
    payment_two = total.round_to(2) 
    payment_three = total.round_to(2)
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

  def check_for_alternate_start_date(form)
    family = form.family
    custom_start = CustomSetting.where(key: "summerStartDate").take
    app_start = AppSetting.where(key: "summerStartDate").take
    # Check if family has a custom setting with a different start date
    if custom_start && family.custom_settings.include?(custom_start)
      if Date.parse(custom_start.value) != form.start_date
        form.set_summer_dates(Date.today.year, Date.parse(custom_start.value))
        form.adjust_lesson_period_dates
        form.save
      end
    elsif app_start && app_start.value != form.start_date
      form.set_summer_dates(Date.today.year, app_start.value)
      form.adjust_lesson_period_dates
      form.save
    end
  end

  def get_summer_weeks_as_strings(start_date=nil, end_date=nil)
    weeks = []
    summer_dates = get_summer_dates(Date.today.year, start_date)
    summer_dates[0].step(summer_dates[1], 7) do |day|
      temp_week = Week.new
      temp_week.start_date = day
      temp_week.end_date = day + 4.days
      week_string = stringify_week(temp_week)
      weeks << week_string
    end
    return weeks
  end

  def get_summer_dates(year=Date.today.year, start=nil)
    # Default start day is first (Monday) of June
    start = start || Date.new(year, 6, 1)

    # First day of summer is always a Monday
    start += 1.days until start.wday == 1

    # Summer always lasts 13 weeks
    finish = (start + 13.weeks) - (3.days)

    return [start, finish]
  end

  def flash_messages
    flash.map do |type, text|
      { id: text.object_id, type: type, text: text }
    end
  end
end
