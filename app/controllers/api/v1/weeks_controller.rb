class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def index
    weeks = Week.where(student_id: params[:student_id])
    @weeks = weeks.sort_by { |week| week.start_date }
    respond_with @weeks
  end

  def update
    # update week
    @week = Week.find(params[:id])
    @week.update_attributes(week_params)

    # respond
    respond_with @week
  end

  private

    def week_params
      params.require(:week).permit(:lesson)
    end

end
