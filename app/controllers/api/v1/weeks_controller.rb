class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def index
    @weeks = Week.where(form_id: params[:form_id])
    respond_with @weeks
  end

  def update
    @week = Week.find(params[:id])
    @week.update_attributes(week_params)
    respond_with @weeks
  end

  private

    def week_params
      params.require(:week).permit(:lesson)
    end

end
