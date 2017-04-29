class Api::V1::AdminPortalController < Api::V1::BaseController

	def index
		instruments = JSON.parse(Instrument.all.order(:created_at).to_json(include: :teachers))
		teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: [:instruments, :unavailable_dates]))
		families = Family.all.order(:created_at)
		students = Student.all.order(:created_at)
		app_settings = AppSetting.all.order(:created_at).index_by(&:key)
		response = {  app_settings: app_settings, instruments: instruments,
                  teachers: teachers, families: families,
                  students: students }
		respond_with response, json: response
	end

end