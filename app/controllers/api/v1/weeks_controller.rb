class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def update
    # update week
    @week = Week.find(params[:id])
    @week.update_attributes(week_params)
    @week.lesson_period.update_lesson_count

    # respond
    respond_with @week, json: @week
  end

  private

    def week_params
      params.require(:week).permit(:lesson, :lesson_length)
    end

end
