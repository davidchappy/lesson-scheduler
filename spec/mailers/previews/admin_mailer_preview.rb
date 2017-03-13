# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview

  def submit_form
    AdminMailer.submit_form_email(Form.first)
  end

end
