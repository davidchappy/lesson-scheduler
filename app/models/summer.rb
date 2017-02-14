class Summer < ApplicationRecord
	has_many :weeks
	has_many :forms

	def self.generate_summer( year=Date.today.year, 
                            start=nil, 
                            finish=nil)
		summer = Summer.create
    summer.year = year

		start = start || Date.new(year, 6, 1)
		start += 1.days until start.wday == 1
		summer.start_date = start

		finish = finish || Date.new(2017, 8, -1)
		if finish.wday < 5
			finish += 1.days until finish.wday == 5
		end
		summer.end_date = finish

    summer.save
    Summer.generate_weeks(summer)
		return summer
	end

  private

    def self.generate_weeks(summer)
      start = summer.start_date
      finish = summer.end_date
      start.step(finish, 7) do |week|
        new_week = summer.weeks.create
        new_week.teacher_id = Teacher.first.id
        new_week.start_date = week
        new_week.end_date = week + 4.days
        new_week.save
      end
    end

end
