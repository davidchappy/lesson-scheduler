class Api::V1::TeachersController < Api::V1::BaseController
  include ApplicationHelper

  def index
    respond_with Teacher.all
  end

  def create
    # admin
  end

  def destroy
    # admin
  end

  def update
    # admin
  end

end
