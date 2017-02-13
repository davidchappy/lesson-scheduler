class Summer < ApplicationRecord
	has_many :weeks
	has_many :forms

  def generate_summer(year=Date.today.year, start=nil, finish=nil)
    summer = Summer.new
    summer = generate_summer_dates(year, start, finish)
    summer.generate_weeks
    return summer
  end

  private 

  	def generate_summmer_dates(	year=Date.today.year, 
  															start=nil, finish=nil)
  		self.year = year

  		start ||= Date.new(year, 6, 1)
  		start += 1.days until start.wday == 1
  		self.start_date = start

  		finish ||= Date.new(2017, 8, -1)
  		if finish.wday < 5
  			finish += 1.days until finish.wday == 5
  		end
  		self.end_date = finish

  		return self
  	end

    def generate_weeks
      start = self.start_date
      finish = self.end_date
      start.step(finish, 7) do |week|
        new_week = self.weeks.create
        new_week.start_date = week
        new_week.end_date = week + 4.days
        new_week.save
      end
    end

end
