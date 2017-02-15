class Api::V1::FormsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    if current_user.type == 'Admin'
      respond_with Form.all
    else
      redirect_to root_url
    end
  end

  def show
    @form = Form.find(params[:id])
    @instrument = @form.instrument
    @teacher = @form.teacher
    respond_with [@instrument, @teacher]
  end

  def new
    respond_with Form.new
  end

  def create
    form = Form.create(forms_params)
    respond_with :api, :v1, [form, form.weeks]
  end

  def edit
    form = Form.find(params["id"])
  end

  def update
    form = Form.find(params["id"])
    form.update_attributes(item_params)
    respond_with form
  end

  def destroy
    form = Form.find(params["id"])
    form.destroy
  end

  private

    def forms_params
      params.require(:form).permit(:student_name, :teacher_id, :family_id, :instrument_id)
    end

end