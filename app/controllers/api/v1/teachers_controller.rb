class Api::V1::TeachersController < Api::V1::BaseController
  def index
    respond_with Teacher.where(instrument_id: params["instrument_id"])
  end

  def show
    respond_with Teacher.find(params[:id])
  end
end