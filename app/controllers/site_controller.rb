class SiteController < ApplicationController
  before_action :authenticate_user!
  
  def index
  	@admin = current_user.type === 'Admin'
  	puts "Admin logged in?: #{@admin}"
  	@family_id = current_user.type === 'Family' ? current_user.id : nil
  	puts "Family id: #{@family_id}"
  end
end