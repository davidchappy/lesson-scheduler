class AdminMailer < ApplicationMailer

  def submit_form_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    mail(to: 'davidchappy@gmail.com', subject: ("Form submission from the " + @family.last_name + " family") )
  end

end
