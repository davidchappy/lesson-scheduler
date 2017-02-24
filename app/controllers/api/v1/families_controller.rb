class Api::V1::FamiliesController < Api::V1::BaseController
  after_action :update_family

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      form = Form.where(family_id: @family.id, year: Date.today.year).first    
      @form = form || Form.create(year: Date.today.year, family_id: @family.id)
      @students = @form.students.sort_by { |student| student.created_at } || []
      respond_with [@family, @students, @form]
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