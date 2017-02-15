class Api::V1::WeeksController < Api::V1::BaseController
  include ApplicationHelper

  def index
    weeks = Week.where(form_id: params[:form_id])
    @weeks = weeks.sort_by { |week| week.start_date }
    respond_with @weeks
  end

  def update
    @week = Week.find(params[:id])
    @week.update_attributes(week_params)
    form = Form.find(@week.form_id)
    form.update_lesson_count
    respond_with @weeks
  end

  private

    def week_params
      params.require(:week).permit(:lesson)
    end

end
