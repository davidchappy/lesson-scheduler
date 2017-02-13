class Family < User
	has_many :students
	has_many :forms, through: :students
end