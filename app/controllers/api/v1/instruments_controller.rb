class Api::V1::InstrumentsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    respond_with Instrument.all
  end

  def create
    instrument = Instrument.new(instruments_params)
    if(instrument.save)
      flash[:success] = "Instrument created."
      respond_with instrument, json: instrument
    else
      redirect_to root_url
    end
  end

  def destroy
    # admin
  end

  private

    def instruments_params
      params.require(:instrument).permit(:name)
    end

end
