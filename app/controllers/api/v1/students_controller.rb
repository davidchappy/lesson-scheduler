class Api::V1::StudentsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    if current_user.type == 'Admin'
      respond_with Student.all
    else
      redirect_to root_url
    end
  end

  def show
    @student = Student.find(params[:id])
    @instrument = @student.instrument
    @teacher = @student.teacher
    @unavailable_dates = @teacher.unavailable_dates
    respond_with [@instrument, @teacher, @student, @unavailable_dates]
  end

  def create
    student = Student.create(students_params)
    student.save
    respond_with :api, :v1, student
  end

  def update
    student = Student.find(params["id"])
    student.update_attributes(students_params)
    respond_with student, json: student
  end

  def destroy
    respond_with Student.destroy(params["id"])
  end

  private

    def students_params
      params.require(:student).permit(:student_name, :teacher_id, :instrument_id, :form_id)
    end

end