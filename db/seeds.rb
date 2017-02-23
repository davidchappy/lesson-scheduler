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

family = Family.create(first_name: 'John', last_name: 'Smith', 
  email: 'family@example.com',
  password: 'password', password_confirmation: 'password')

piano = Instrument.create(name: 'Piano')
guitar = Instrument.create(name: 'Guitar')

teacher = Teacher.create(first_name: 'Nathan', last_name: 'Arnold', 
  instrument_id: piano.id)
teacher2 = Teacher.create(first_name: 'David', last_name: 'Chapman', 
  instrument_id: guitar.id)

form = Form.create(year: Date.today.year, family_id: family.id)

student = Student.create(teacher_id: teacher.id, instrument_id: piano.id, 
  student_name: 'Jim', form_id: form.id)
student2 = Student.create(teacher_id: teacher2.id, instrument_id: guitar.id, 
  student_name: 'Billy', form_id: form.id)
student3 = Student.create(teacher_id: teacher.id, instrument_id: piano.id, 
  student_name: 'Sarah', form_id: form.id)