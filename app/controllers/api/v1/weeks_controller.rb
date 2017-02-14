class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def index
    @weeks = Week.where(form_id: params[:form_id])
    respond_with @weeks
  end

  def create
  end

  def destroy
  end

end
