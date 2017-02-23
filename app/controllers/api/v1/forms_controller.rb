class Api::V1::FormsController < Api::V1::BaseController

  def index
    # admin
  end

  def show
    # admin
  end

  # for marking submitted
  def update
    if current.user.type == 'Family'
      @form = Form.where(family_id: current_user.id, year: Time.now.year)
      @form.submitted = true
      @form.submitted = DateTime.now
      @form.save
    else
      # admin
    end
  end
end