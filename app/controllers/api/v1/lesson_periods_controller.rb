class Api::V1::LessonPeriodsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    if current_user.type == 'Admin'
      respond_with LessonPeriod.all
    else
      redirect_to root_url
    end
  end

  def show
    @lesson_period = LessonPeriod.find(params[:id])
    @student = @lesson_period.student
    @instrument = @lesson_period.instrument
    @teacher = @lesson_period.teacher

    respond_with  lesson_period: @lesson_period, student: @student, 
                  instrument: @instrument, teacher: @teacher
  end

  def create
    family =  Family.find(params[:family_id]) ||
              Family.find(current_user.id)
    student = Student.where(name: params[:name]).take || 
              family.students.create(name: params[:name])
    new_lesson_period = student.lesson_periods.build(lesson_periods_params)

    if new_lesson_period.save
      response = {  lesson_period: new_lesson_period, 
                    student: student, weeks: new_lesson_period.weeks }
      respond_with response, json: response
    else
      puts "couldn't create lesson period"
    end
  end

  def update
    lesson_period = LessonPeriod.find(params["id"])

    # first, update this period's student name
    student = Student.find(lesson_period.student_id)
    student.update_attribute(:name, params[:name])

    # then update the lesson_period with the params
    default_lesson_length = lesson_period.default_lesson_length
    lesson_period.update_attributes(lesson_periods_params)
    lesson_period.update_weeks if default_lesson_length != lesson_period.default_lesson_length

    response = { lesson_period: lesson_period, student: student }
    respond_with response, json: response
  end

  def destroy
    respond_with LessonPeriod.destroy(params["id"])
  end

  private

    def lesson_periods_params
      params.require(:lesson_period).permit(  :form_id, :instrument_id, 
                                              :teacher_id, :default_lesson_length )
    end

end