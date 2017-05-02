module AppSettingSeeds
	puts "app setting seeds"
	settings = [
		{key: "lessonLengthOptions", name: "Lesson Lengths", value: "30,45,60,75,90,105,120", description: ""},
		{key: "thirtyMinRate", name: "30Min Rate", value: "2000", description: ""},
		{key: "baseLessonLength", name: "Base Lesson Length", value: "30", description: ""},
		{key: "adminEmail", name: "Admin Email", value: "nja@dmusicstudios.com", description: ""},
		{key: "adminPhone", name: "Admin Phone", value: "864-363-8526", description: ""},
		{key: "lessonMinimum", name: "Lesson Minimum", value: "7", description: ""},
		{key: "submissionDeadline", name: "Submission Deadline", value: "June 1, 2017 00:00:00", description: ""},
		{key: "displayedSubmissionDeadline", name: "Displayed Submission Deadline", value: "May 20, 2017 00:00:00", description: ""},
	]

	settings.each do |setting|
		AppSetting.create(setting)
	end
end