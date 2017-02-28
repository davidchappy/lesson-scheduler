class Api::V1::LessonPeriodsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    if current_user.type == 'Admin'
      respond_with Student.all
    else
      redirect_to root_url
    end
  end

  def show
    @lesson_period = LessonPeriod.find(params[:id])
    @instrument = @lesson_period.instrument
    @teacher = @lesson_period.teacher
    @unavailable_dates = @teacher.unavailable_dates
    respond_with [@instrument, @teacher, @lesson_period, @unavailable_dates]
  end

  def create
    lesson_period = LessonPeriod.create(lesson_periods_params)
    respond_with :api, :v1, lesson_period
  end

  def update
    lesson_period = LessonPeriod.find(params["id"])
    lesson_period.update_attributes(lesson_periods_params)
    respond_with lesson_period, json: lesson_period
  end

  def destroy
    respond_with LessonPeriod.destroy(params["id"])
  end

  private

    def lesson_periods_params
      params.require(:lesson_period).permit(:student_id, :teacher_id, :instrument_id, :form_id)
    end

end