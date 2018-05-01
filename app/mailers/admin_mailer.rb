class AdminMailer < ApplicationMailer
  helper :application
  default from: 'summerscheduledms@gmail.com'

  def submission_pricing_email(form, pricing_data)
    # byebug
    @form = form
    @family = @form.family
    @students = @form.students
    @lesson_periods = @form.lesson_periods
    @pricing_data = pricing_data
    @payment_dates = ['June 1st', 'July 1st', 'August 1st']
    admin_email = AppSetting.where(key: "adminEmail").take.value
    mail( to: admin_email,
          bcc: 'davidchappy@gmail.com',
          subject: ("Form submission from the " + @family.last_name + " family -- Pricing"))
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
    mail(
      to: [admin_email, @family.email],
      bcc: 'davidchappy@gmail.com',
      subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family"),
      from: admin_email
    )
    # mg_client = Mailgun::Client.new ENV['api_key']
    # message_params = {
    #   to: ['davidchappy@gmail.com', AppSetting.where(key: "adminEmail").take.value, @family.email],
    #   subject: ("Thanks for signing up! Lesson schedule for the " + @family.last_name + " family")
    # }
    # mg_client.send_message ENV['domain'], message_params
  end

end
