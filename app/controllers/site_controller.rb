class SiteController < ApplicationController
  before_action :authenticate_user!
  
  def index
    @app_settings = AppSetting.all.index_by(&:key)

  	if current_user.type === 'Family'
  		@admin = false
  		@family_id = current_user.id
  	elsif current_user.type === 'Admin'
  		@admin = true
  		@family_id = params["family_id"] || nil
  	else 
  		flash[:error] = "Please try logging in again"
  		redirect_to root_url
  	end
  end
end