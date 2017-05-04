class Api::V1::CustomSettingsController < Api::V1::BaseController
  include ApplicationHelper

  def create
    profile = SettingProfile.find(params[:custom_setting][:profile_id])
    app_setting = AppSetting.find(params[:custom_setting][:setting_id])
    custom_setting = profile.custom_settings.build( key: app_setting.key, 
                                                    name: app_setting.name,
                                                    value: app_setting.value,
                                                    description: app_setting.description)
    if custom_setting.save
      flash[:sucess] = "Custom setting added."
      respond_with custom_setting, json: custom_setting
    else
      flash[:error] = "Couldn't add custom setting."
      redirect_to root_url
    end
  end

  def update
    custom_setting = CustomSetting.find(params[:id])
    if custom_setting.update_attributes(value: params[:custom_setting][:value])
      flash[:success] = "Custom setting updated."
      respond_with custom_setting, json: custom_setting
    else
      flash[:error] = "Couldn't update custom setting."
      redirect_to root_url    
    end
  end

  def destroy
    setting = CustomSetting.find(params[:id]).destroy
    flash["success"] = "Custom Setting removed."
    respond_with setting, json: setting  
  end

  private

    def custom_settings_params
      params.require(:custom_setting).permit(:key, :name, :value, :description, :setting_id, :profile_id)
    end

end
