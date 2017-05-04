class Api::V1::SettingProfilesController < Api::V1::BaseController
  include ApplicationHelper

  def create
    profile = SettingProfile.new(custom_settings_params)
    if profile.save
      flash["success"] = "Custom Setting Profile created"
      respond_with profile, json: profile
    else
      flash["error"] = "Couldn't create custom profile."
      redirect_to root_url
    end 
  end

  def update
    profile = SettingProfile.find(params[:id])
    if profile.update_attributes(custom_settings_params)
      flash["success"] = "Custom Setting Profile saved."
      respond_with profile, json: profile
    else
      flash["error"] = "Couldn't save custom profile."
      redirect_to root_url
    end
  end

  def destroy
    SettingProfile.destroy(params[:id])
    flash[:success] = "Custom Settings Profile Removed"
    setting_profiles = JSON.parse(SettingProfile.all.order(:created_at).to_json(include: [:custom_settings, :families]))
    respond_with setting_profiles, json: setting_profiles
  end

  private

    def custom_settings_params
      params.require(:setting_profile).permit(:name, :code, :expiration)
    end

end
