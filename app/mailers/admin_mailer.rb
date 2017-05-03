class AdminMailer < ApplicationMailer
  helper :application
  default from: 'nja@dmusicstudios.com'

  def submission_pricing_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    admin_email = AppSetting.where(key: "adminEmail").take.value
    mail( to: ['davidchappy@gmail.com', admin_email], 
          subject: ("Form submission from the " + @family.last_name + " family -- Pricing"),
          from: admin_email)
    # mg_client = Mailgun::Client.new ENV['api_key']
    # message_params = {
    #   to: ['davidchappy@gmail.com', AppSetting.where(key: "adminEmail").take.value],
    #   subject: ("Form submission from the " + @family.last_name + " family -- Pricing")
    # }
    # mg_client.send_message ENV['domain'], message_params
  end

  def submission_scheduling_email(form)
    @form = form
    @family = form.family
    @students = form.students
    @lesson_periods = form.lesson_periods
    admin_email = AppSetting.where(key: "adminEmail").take.value
    mail( to: ['davidchappy@gmail.com', admin_email, @family.email], 
        subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family"),
        from: admin_email)
    # mg_client = Mailgun::Client.new ENV['api_key']
    # message_params = {
    #   to: ['davidchappy@gmail.com', AppSetting.where(key: "adminEmail").take.value, @family.email],
    #   subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family")
    # }
    # mg_client.send_message ENV['domain'], message_params
  end

end
