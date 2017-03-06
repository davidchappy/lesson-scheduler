class Api::V1::FamiliesController < Api::V1::BaseController

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      @students = @family.students
      @form = @family.find_or_create_current_form 
      @lesson_periods = @form.lesson_periods.order(:created_at)
      @weeks = LessonPeriod.get_weeks_as_hash(@lesson_periods)

      respond_with  family: @family, form: @form, weeks: @weeks,
                    lesson_periods: @lesson_periods, students: @students 
    else
      respond_with Family.all
    end
  end

end