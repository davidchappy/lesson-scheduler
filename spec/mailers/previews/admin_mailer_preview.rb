# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview

  def submission_pricing
    AdminMailer.submission_pricing_email(Form.first)
  end

  def submission_scheduling
    AdminMailer.submission_scheduling_email(Form.first)
  end

end
