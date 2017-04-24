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

  def update
    instrument = Instrument.find(params[:id])
    if instrument.update_attributes(instruments_params)
      respond_with instrument, json: instrument
    else
      redirect_to root_url
    end
  end

  def destroy
    Instrument.destroy(params[:id])
    flash[:success] = "Instrument Removed"
    instruments = JSON.parse(Instrument.all.order(:created_at).to_json(include: :teachers))
    respond_with instruments, json: instruments
  end

  private

    def instruments_params
      params.require(:instrument).permit(:name)
    end

end
