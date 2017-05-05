class Api::V1::FamiliesController < Api::V1::BaseController
  include ApplicationHelper

  def update
    family = Family.find(params[:id])
    setting_profile = SettingProfile.where(code: params[:family][:code]).take
    family.setting_profiles << setting_profile unless family.setting_profiles.include?(setting_profile)
    if family.save
      flash[:success] = "Code added."
      respond_with family, json: family
    else
      flash[:error] = "Couldn't add that code - please try typing your code again."
      redirect_to root_url
    end
  end

  private

    def families_params
      params.require(:family).permit(:code)
    end
end