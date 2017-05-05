class Api::V1::AdminPortalController < Api::V1::BaseController
	include ApplicationHelper

	def index
		instruments = JSON.parse(Instrument.all.order(:created_at).to_json(include: :teachers))
		teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: [:instruments, :unavailable_weeks]))
		families = JSON.parse(Family.all.order(:created_at).to_json(include: :lesson_periods))
		students = Student.all.order(:created_at)

		# check summerWeeks setting exists for current year or create it
		summer_weeks = AppSetting.where(key: 'summerWeeks').take
		if ( summer_weeks && summer_weeks.created_at.to_s.include?(String(Date.today.year)) )
		else
			summer_weeks.destroy! if summer_weeks
			weeks_array = get_summer_weeks_as_strings
			summer_weeks = AppSetting.create(key: 'summerWeeks', name: "Summer Weeks", value: weeks_array)
		end
		app_settings = AppSetting.all.order(:name).index_by(&:key)
		setting_profiles = JSON.parse(SettingProfile.all.order(:created_at).to_json(include: [:custom_settings, :families]))
		response = {  app_settings: app_settings, instruments: instruments,
                  teachers: teachers, families: families,
                  students: students, summer_weeks: summer_weeks,
                  setting_profiles: setting_profiles }
		respond_with response, json: response
	end

end