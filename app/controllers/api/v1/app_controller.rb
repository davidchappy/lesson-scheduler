class Api::V1::AppController < Api::V1::BaseController
  include ApplicationHelper

  def index
    @family = nil
    if current_user.type === 'Admin' && params["family_id"]
      @family = Family.find(params["family_id"])
    else
      @family = Family.find(current_user.id)      
    end
    @instruments = Instrument.all
    @teachers = Teacher.all
    @students = @family.students
    @form = @family.find_or_create_current_form 
    @lesson_periods = @form.lesson_periods.order(:created_at)
    @weeks = LessonPeriod.get_weeks_as_hash(@lesson_periods)

    respond_with  instruments: @instruments, teachers: @teachers, 
                  family: @family, students: @students, form: @form, 
                  lesson_periods: @lesson_periods, weeks: @weeks,
                  messages: flash_messages 
  end

end