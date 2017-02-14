# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# admin = Admin.create(first_name: 'DMS', last_name: 'Admin', 
#   email: 'admin@dmusicstudios.com', 
#   password: 'password', password_confirmation: 'password')

piano = Instrument.create(name: 'Piano')

teacher = Teacher.create(first_name: 'Piano', last_name: 'Teacher', 
  instrument_id: piano.id)

family = Family.create(first_name: 'Lovely', last_name: 'Family', 
  email: 'family@example.com',
  password: 'password', password_confirmation: 'password')

form = Form.create(teacher_id: teacher.id, instrument_id: piano.id, 
  student_name: 'Jim', family_id: family.id)

