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
      @form.total_cost = form_params[:total_cost]
      if @form.save
        AdminMailer.submit_form_email(@form).deliver_now
        redirect_to root_url
      else
        flash[:error] = "There was a problem submitting your form. Please try again later."
      end
    else
      # admin
    end
  end

  private

    def form_params
      params.require(:form).permit(:total_cost)
    end
end