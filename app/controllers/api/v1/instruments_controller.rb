class Api::V1::InstrumentsController < Api::V1::BaseController
  include ApplicationHelper

  def index
    respond_with Instrument.all
  end

  def create
    # admin
  end

  def destroy
    # admin
  end

end
