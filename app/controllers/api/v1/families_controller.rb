class Api::V1::FamiliesController < Api::V1::BaseController
  before_action :update_family

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      students = Student.where(family_id: @family.id)
      @students = students.sort_by { |student| student.created_at }
      respond_with [@family, @students]
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