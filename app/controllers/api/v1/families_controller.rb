class Api::V1::FamiliesController < Api::V1::BaseController
  before_action :update_family

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      respond_with @family
    else
      respond_with Family.all
    end
  end

  private 

    def update_family
      family = Family.find(current_user.id)
      family.update_counts
    end
end