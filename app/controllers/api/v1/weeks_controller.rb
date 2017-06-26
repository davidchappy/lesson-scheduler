class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def update
    # update week
    @week = Week.find(params[:id])
    @week.update_attributes(lesson: params[:lesson], lesson_length: params[:lesson_length])
    @week.lesson_period.update_lesson_count

    form = @week.lesson_period.form
    form.total_cost = params[:total_owed]
    form.save!

    # respond
    respond_with @week, json: @week
  end

  private

    def week_params
      params.permit(:total_owed, :lesson, :lesson_length)
    end

end
