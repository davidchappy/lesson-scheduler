module AppSettingSeeds
	puts "app setting seeds"
	settings = [
		{key: "lessonLengthOptions", name: "Lesson Lengths", value: "30,45,60,75,90,105,120", description: ""},
		{key: "thirtyMinRate", name: "30Min Rate", value: "2000", description: ""},
		{key: "thirtyMinRateTwo", name: "30 Min Rate - 2 Students", value: "1800", description: ""},
		{key: "thirtyMinRateThreePlus", name: "30 Min Rate - 3+ Students", value: "1600", description: ""},
		{key: "lessonsDiscountOne", name: "Rate Discount: 9-10 Lessons", value: "2000", description: ""},
		{key: "lessonsDiscountTwo", name: "Rate Discount: 11-13 Lessons", value: "3000", description: ""},
		{key: "multipleStudentBonus", name: "Multiple Student Discount", value: "500", description: ""},
		{key: "baseLessonLength", name: "Base Lesson Length", value: "30", description: ""},
		{key: "adminEmail", name: "Admin Email", value: "nja@dmusicstudios.com", description: ""},
		{key: "adminPhone", name: "Admin Phone", value: "864-363-8526", description: ""},
		{key: "lessonMinimum", name: "Lesson Minimum", value: "7", description: ""},
		{key: "summerStartDate", name: "First Day (Monday) of Summer Schedule", value: Date.new(2017, 6, 5), description: ""},
		{key: "submissionDeadline", name: "Submission Deadline", value: "June 1, 2017 00:00:00", description: ""},
		{key: "displayedSubmissionDeadline", name: "Displayed Submission Deadline", value: "May 20, 2017 00:00:00", description: ""},
	]

	settings.each do |setting|
		AppSetting.create(setting)
	end
end