module ContentEntrySeeds
	puts "content entry seeds"

  welcomePopupBodyValue     = "To encourage students’ continued progress over the summer months, we offer discounts for multiple students and higher numbers of lessons (each student is asked to take at least 7 lessons over summer to reserve a lesson spot for the fall).<br><br>This scheduling tool is optional—if students choose NOT to submit a schedule by the deadline listed in the heading above, they will remain on the the regular payment schedule for summer with the option to make up lessons as needed.<br><br>If there are any questions about these discounts or the schedule, please contact us below and we would be glad to help!"
  welcomePopupMobileWarning = "This app does not yet fully support mobile usage. For best results, please use an updated browser on a computer."
  codesBody                 = "If you have received a special code, please type it below and hit enter.<br>(codes are used for scheduling exceptions and not needed for most signups)"
  codesTitle                = "Have a Code?"
  formSubmitButton          = "Submit Form"
  addStudentButton          = "Add Student"
  paymentPlanTitle          = "Payment Plan"
  discountDetailsTitle      = "Here is a breakdown of your savings:"
  discountMultipleText      = "Multiple student discount:"
  discountRateText          = "Rate discount from number of students:"
  discountBonusText         = "Multiple student bonus:"

  entries = [
    { key: "welcomePopupBody", name: "Welcome Popup-Body Text", value: welcomePopupBodyValue, description: "", char_limit: nil},
    { key: "welcomePopupMobileWarning", name: "Welcome Popup-Warning Text", value: welcomePopupMobileWarning, description: "", char_limit: nil},
    { key: "codesBody", name: "Family Codes-Body Text", value: codesBody, description: "", char_limit: nil},
    { key: "codesTitle", name: "Family Codes-Title Text", value: codesTitle, description: "", char_limit: nil},
    { key: "formSubmitButton", name: "Form Submit Button Text", value: formSubmitButton, description: "", char_limit: 30},
    { key: "addStudentButton", name: "Add Student Button Text", value: addStudentButton, description: "", char_limit: 30},
    { key: "paymentPlanTitle", name: "Payment Plan Title", value: paymentPlanTitle, description: "", char_limit: 30},
    { key: "discountDetailsTitle", name: "Discount Details-Popup Title", value: discountDetailsTitle, description: "", char_limit: 30},
    { key: "discountMultipleText", name: "Discount Details-Multiple Student Text", value: discountMultipleText, description: "", char_limit: 30},
    { key: "discountRateText", name: "Discount Details-Rate Text", value: discountRateText, description: "", char_limit: 30},
    { key: "discountBonusText", name: "Discount Details-Multiple Student Bonus Text", value: discountBonusText, description: "", char_limit: 30},
  ]

  entries.each do |entry|
    ContentEntry.create(entry)
  end
end