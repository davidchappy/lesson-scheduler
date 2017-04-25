class Api::V1::TeachersController < Api::V1::BaseController
  include ApplicationHelper

  def index
    respond_with Teacher.all
  end

  def create
    teacher = Teacher.new(teachers_params)
    if(teacher.save)
      flash[:success] = "Teacher created."
      respond_with teacher, json: teacher
    else
      redirect_to root_url
    end
  end

  def update
    teacher = Teacher.find(params[:id])
    if teacher.update_attributes(teachers_params)
      respond_with teacher, json: teacher
    else
      redirect_to root_url
    end
  end

  def destroy
    Teacher.destroy(params[:id])
    flash[:success] = "Teacher Removed"
    teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: :instruments))
    respond_with teachers, json: teachers
  end

  private

    def teachers_params
      params.require(:teacher).permit(:first_name, :last_name, :instruments)
    end

end
