class Api::V1::AdminPortalController < Api::V1::BaseController

	def index
		instruments = Instrument.all
		teachers = Teacher.all
		families = Family.all
		students = Student.all
		app_settings = AppSetting.all.index_by(&:key)
		# puts "App Settings: "
		# puts app_settings		
		response = { app_settings: app_settings }
		respond_with response, json: response
	end

end