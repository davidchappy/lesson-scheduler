class AdminMailer < ApplicationMailer
  helper :application
  # admin_email = AppSetting.where(key: "adminEmail").take.value
  # default from: admin_email

  def submission_pricing_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    mg_client = Mailgun::Client.new ENV['api_key']
    message_params = {
      to: ['davidchappy@gmail.com', AppSetting.where(key: "adminEmail").take.value],
      subject: ("Form submission from the " + @family.last_name + " family -- Pricing")
    }
    mg_client.send_message ENV['domain'], message_params
  end

  def submission_scheduling_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    mg_client = Mailgun::Client.new ENV['api_key']
    message_params = {
      to: ['davidchappy@gmail.com', AppSetting.where(key: "adminEmail").take.value, @family.email],
      subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family")
    }
    mg_client.send_message ENV['domain'], message_params
  end

end
