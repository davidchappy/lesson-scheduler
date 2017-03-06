class Api::V1::AppController < Api::V1::BaseController
  def index
    @family = Family.find(current_user.id)
    @students = @family.students
    @form = @family.find_or_create_current_form 
    @lesson_periods = @form.lesson_periods.order(:created_at).to_json( include: :weeks )
    puts @lesson_periods.inspect

    response =  {  
                  family: @family, form: @form, 
                  lesson_periods: @lesson_periods, 
                  students: @students   
                }
    respond_with response, json: response
  end
end