class Api::V1::FamiliesController < Api::V1::BaseController

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      @form = @family.find_or_create_current_form 
      @family.update_student_count(@form)   
      @students = @form.students.sort_by { |student| student.created_at } || []
      respond_with family: @family, students: @students, form: @form
    else
      respond_with Family.all
    end
  end

end