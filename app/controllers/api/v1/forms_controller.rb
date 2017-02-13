class Api::V1::FormsController < Api::V1::BaseController

  def index
    respond_with Form.all
  end

  def new
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

    def forms_params
      
    end

end