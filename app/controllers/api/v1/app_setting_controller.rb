class Api::V1::AppSettingsController < Api::V1::BaseController

	def index
		@app_settings = AppSetting.all.index_by(&:name)
		respond_with @app_settings, json: @app_settings
	end

	def update
		@app_setting = AppSetting.find(params[:id])
		if @app_setting.update_attributes(app_settings_params)
			flash.now[:success] = "Setting Saved"
			respond_with @app_setting, json: @app_setting
		else
			message = "Sorry there was an error: "
			message += @app_setting.errors.full_messages.first
	    flash[:danger] = message
	    redirect_to root_url
		end
	end

	private

		def app_settings_params
			params.require(:app_settings).permit(:name, :value)
		end

end
