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
    
    # Add an instrument
    if params[:teacher][:instrument_id] && params[:teacher][:instrument_id] != ""
      added_instrument = Instrument.find(params[:teacher][:instrument_id])
      if teacher.instruments.include?(added_instrument)
        teacher.instruments.delete(added_instrument)
      else
        teacher.instruments << added_instrument
      end
      teacher.instruments = teacher.instruments.order(:created_at)
    end

    # Adding an unavailable week
    if params[:teacher][:new_week_index] && params[:teacher][:new_week_index] != ""
      index = params[:teacher][:new_week_index].to_i
      summer_weeks = AppSetting.where(key: 'summerWeeks').take
      week = de_stringify_week(summer_weeks.value[index])
      teacher.unavailable_weeks.create( start_date: week["start_date"], 
                                        end_date: week["end_date"])
    end

    # Removing an unavailable week
    if params[:teacher][:week_to_remove_id] && params[:teacher][:week_to_remove_id] != ""
      teacher.unavailable_weeks.find(params[:teacher][:week_to_remove_id]).destroy
    end

    # Update teacher
    teacher.save
    if teacher.update_attributes( first_name: params[:teacher][:first_name], 
                                  last_name: params[:teacher][:last_name])
      teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: [:instruments, :unavailable_weeks]))
      respond_with teachers, json: teachers
    else
      redirect_to root_url
    end
  end

  def destroy
    Teacher.destroy(params[:id])
    flash[:success] = "Teacher Removed"
    teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: [:instruments, :unavailable_weeks]))
    respond_with teachers, json: teachers
  end

  private

    def teachers_params
      params.require(:teacher).permit(:first_name, :last_name, 
                                      :instrument_id, :unavailable_weeks,
                                      :new_week_index, :week_to_remove_id)
    end

end
