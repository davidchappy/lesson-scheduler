# Preview all emails at http://localhost:3000/rails/mailers/admin_mailer
class AdminMailerPreview < ActionMailer::Preview

  def submission_pricing
    pricing_data = {
      "currentDiscounts" => {
        "rate" => 7900,
        "lessons" => 9000,
        "quantity" => 1000
      }
    }
    form = Form.where(submitted: true).take
    AdminMailer.submission_pricing_email(form, pricing_data)
  end

  def submission_scheduling
    AdminMailer.submission_scheduling_email(Form.first)
  end

end
