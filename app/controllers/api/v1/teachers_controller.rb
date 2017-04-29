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
    puts params.inspect
    
    if params[:teacher][:instrument_id]
      added_instrument = Instrument.find(params[:teacher][:instrument_id])
      if teacher.instruments.include?(added_instrument)
        teacher.instruments.delete(added_instrument)
      else
        teacher.instruments << added_instrument
      end
      teacher.instruments = teacher.instruments.order(:created_at)
      teacher.save
    end

    if params[:teacher][:unavailable_dates]
      puts params[:teacher][:unavailable_dates]
    end
    
    if teacher.update_attributes( first_name: params[:teacher][:first_name], 
                                  last_name: params[:teacher][:last_name])
      teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: :instruments))
      respond_with teachers, json: teachers
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
      params.require(:teacher).permit(:first_name, :last_name, :instrument_id, :unavailable_dates)
    end

end
