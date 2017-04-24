class Api::V1::AdminPortalController < Api::V1::BaseController

	def index
		instruments = Instrument.all
		teachers = Teacher.all
		families = Family.all
		students = Student.all
		app_settings = AppSetting.all.index_by(&:key)
		response = {  app_settings: app_settings, instruments: instruments,
                  teachers: teachers, families: families,
                  students: students }
		respond_with response, json: response
	end

end