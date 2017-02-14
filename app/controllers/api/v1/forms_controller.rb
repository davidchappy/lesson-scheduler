class Api::V1::FormsController < Api::V1::BaseController
  include ApplicationHelper
  before_action :authenticate_user!

  def index
    response = []
    if current_user.type == 'Family'
      @family = Family.find(current_user.id)
      @summer = Summer.where(year: Date.today.year).take || Summer.generate_summer
      @weeks = @summer.weeks
      @lessons = []
      @family.forms.each_with_index do |form, index|
        form.lessons.each do |lesson|
          @lessons[index] << lesson
        end 
      end
      # @lessons = @family.forms.map.with_index do |form, index| 
      #   [index + 1, stringify_week(form.lessons.week)] 
      # end
      rendered_weeks = @weeks.map.with_index { |week, index| [index + 1, stringify_week(week)] }
      response.push(@family, @summer, @lessons, rendered_weeks)
    else
    end
    respond_with response
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