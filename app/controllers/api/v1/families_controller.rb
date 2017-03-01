class Api::V1::FamiliesController < Api::V1::BaseController

  def index
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      @form = @family.find_or_create_current_form 
      @form.update_lesson_count
      @form.update_lesson_period_count
      @lesson_periods = @form.sorted_lesson_periods
      respond_with family: @family, form: @form, lesson_periods: @lesson_periods 
    else
      respond_with Family.all
    end
  end

end