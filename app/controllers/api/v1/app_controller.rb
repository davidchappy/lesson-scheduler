class Api::V1::AppController < Api::V1::BaseController

  def index
    if current_user.type == 'Family'
      @instruments = Instrument.all
      @teachers = Teacher.all
      @family = Family.find(current_user.id)
      @students = @family.students
      @form = @family.find_or_create_current_form 
      @lesson_periods = @form.lesson_periods.order(:created_at)
      @weeks = LessonPeriod.get_weeks_as_hash(@lesson_periods)

      respond_with  instruments: @instruments, teachers: @teachers, 
                    family: @family, students: @students, form: @form, 
                    lesson_periods: @lesson_periods, weeks: @weeks 
                    
    elsif current_user.type == 'Admin'
      # admin
    else 
      # error
    end
  end

end