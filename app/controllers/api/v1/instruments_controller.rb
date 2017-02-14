class Api::V1::InstrumentsController < Api::V1::BaseController
  def index
    respond_with Instrument.all
  end

  def show
    respond_with Instrument.find(params[:id])
  end
end