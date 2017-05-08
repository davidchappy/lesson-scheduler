class Api::V1::FamiliesController < Api::V1::BaseController
  include ApplicationHelper

  def update
    family = Family.find(params[:id])
    
    if params[:family][:code]
      setting_profile = SettingProfile.where(code: params[:family][:code]).take
      family.setting_profiles << setting_profile
    elsif params[:family][:code_id] && family.setting_profiles.find(params[:family][:code_id])
      family.setting_profiles.destroy(params[:family][:code_id])
    end

    if family.save
      flash[:success] = "Setting Profile updated."
      respond_with family, json: family
    else
      flash[:error] = "Couldn't update your setting profile - please try again."
      redirect_to root_url
    end
  end

  def destroy
    family = Family.find(params[:id]).destroy
    respond_with family, json: family
  end

  private

    def families_params
      params.require(:family).permit(:code, :code_id)
    end
end