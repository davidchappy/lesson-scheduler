class Api::V1::FormsController < Api::V1::BaseController

  def index
    # admin
  end

  def show
    # admin
  end

  # for marking submitted
  def update
    @pricing_data = collect_pricing_data(form_params[:pricing_data])
    @form = Form.find(params[:id])
    @form.submitted = true
    @form.submitted_at = DateTime.now
    @form.submission_count += 1
    @form.student_count = @form.lesson_periods.length
    @form.total_cost = form_params[:total_cost]
    if @form.save
      AdminMailer.submission_pricing_email(@form, @pricing_data).deliver_now
      AdminMailer.submission_scheduling_email(@form).deliver_now
      flash[:success] = "Your form has been submitted"
      head :ok
    else
      flash[:error] = "There was a problem submitting your form. Please try again later."
      redirect_to root_url
    end
  end

  private
    def collect_pricing_data(params)
      {
        currentPricing: {
          discount: params[:currentPricing][:discount],
          totalOwed: params[:currentPricing][:totalOwed],
          possibleDiscount: params[:currentPricing][:possibleDiscount],
        },
        possibleDiscounts: {
          lessons: params[:possibleDiscounts][:lessons],
          rate: params[:possibleDiscounts][:rate],
          quantity: params[:possibleDiscounts][:quantity],
        },
        currentDiscounts: {
          lessons: params[:currentDiscounts][:lessons],
          rate: params[:currentDiscounts][:rate],
          quantity: params[:currentDiscounts][:quantity],
        },
        payments: params[:payments]
      }
    end

    def pricing_data_params
      pricing_data = {
        pricing_data: {
          currentPricing: [:discount, :totalOwed, :possibleDiscount],
          possibleDiscounts: [:lessons, :rate, :quantity],
          currentDiscounts: [:rate, :quantity, :lessons],
          payments: []
        }
      }
    end

    def form_params
      params.require(:form).permit(:total_cost, pricing_data_params)
    end
end