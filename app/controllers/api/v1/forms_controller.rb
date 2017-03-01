class Api::V1::FormsController < Api::V1::BaseController

  def index
    # admin
  end

  def show
    # admin
  end

  # for marking submitted
  def update
    if current_user.type == 'Family'
      @form = Form.find(params[:id])
      @form.submitted = true
      @form.submitted_at = DateTime.now
      @form.save
      @form.update_attributes(form_params)
      respond_with @form, json: @form
    else
      # admin
    end
  end

  private

    def form_params
      params.require(:form).permit(:total_cost)
    end
end