class AdminMailer < ApplicationMailer
  helper :application

  def submission_pricing_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    admin_email = AppSetting.where(key: "adminEmail").take.value
    mail(to: ['davidchappy@gmail.com', admin_email], subject: ("Form submission from the " + @family.last_name + " family -- Pricing") )
  end

  def submission_scheduling_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    admin_email = AppSetting.where(key: "adminEmail").take.value
    mail(to: ['davidchappy@gmail.com', admin_email], subject: ("Form submission from the " + @family.last_name + " family  -- Scheduling") )
  end

end
