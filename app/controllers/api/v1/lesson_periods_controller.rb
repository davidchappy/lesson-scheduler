class Api::V1::LessonPeriodsController < Api::V1::BaseController
  include ApplicationHelper
  after_action :purge_unused_students, only: [:update, :destroy]

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
      flash[:success] = "Lesson period created"
      # response = {  lesson_period: new_lesson_period, 
      #               student: student, weeks: new_lesson_period.weeks,
      #               messages: flash_messages }
      # respond_with response, json: response
      render nothing: true, status: 200 
    else
      message = new_lesson_period.errors.full_messages.first
      flash[:danger] = message
      redirect_to root_url
      puts "couldn't create lesson period"
      puts messages.inspect
    end
  end

  def update
    lesson_period = LessonPeriod.find(params["id"])
    family =  lesson_period.student.family

    # find or create (if renamed) the student for this lesson period 
    student = Student.where(name: params[:name]).take || 
              family.students.create(name: params[:name])

    # then update the lesson_period with the params
    new_default_lesson_length = lesson_period.default_lesson_length
    lesson_period.update_attribute(:student, student)
    lesson_period.update_attributes(lesson_periods_params)
    lesson_period.update_weeks if new_default_lesson_length != lesson_period.default_lesson_length

    flash.now[:success] = "Lesson period updated"

    response = {  lesson_period: lesson_period, student: student,
                  messages: flash_messages }
    # puts "response: "
    # puts response.inspect
    respond_with response, json: response
  end

  def destroy
    lesson_period = LessonPeriod.destroy(params["id"])
    flash[:success] = "Lesson period deleted"
    response = { lesson_period: lesson_period, messages: flash_messages }
    respond_with response, json: response
  end

  private

    def lesson_periods_params
      params.require(:lesson_period).permit(  :form_id, :instrument_id, 
                                              :teacher_id, :default_lesson_length,
                                              :locked )
    end

    def purge_unused_students
      Student.purge_unused
    end

end