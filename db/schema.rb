# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170429131456) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "app_settings", force: :cascade do |t|
    t.string   "name"
    t.text     "value"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "description"
    t.string   "key"
  end

  create_table "forms", force: :cascade do |t|
    t.integer  "year"
    t.datetime "submitted_at"
    t.boolean  "submitted"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.integer  "lesson_count"
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "student_count"
    t.string   "total_cost"
    t.integer  "family_id"
    t.index ["family_id"], name: "index_forms_on_family_id", using: :btree
  end

  create_table "instruments", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "instruments_teachers", id: false, force: :cascade do |t|
    t.integer "instrument_id"
    t.integer "teacher_id"
    t.index ["instrument_id"], name: "index_instruments_teachers_on_instrument_id", using: :btree
    t.index ["teacher_id"], name: "index_instruments_teachers_on_teacher_id", using: :btree
  end

  create_table "lesson_periods", force: :cascade do |t|
    t.integer  "student_id"
    t.integer  "teacher_id"
    t.integer  "instrument_id"
    t.integer  "form_id"
    t.integer  "lesson_count"
    t.integer  "default_lesson_length", default: 30
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.boolean  "locked",                default: false
    t.index ["form_id"], name: "index_lesson_periods_on_form_id", using: :btree
    t.index ["instrument_id"], name: "index_lesson_periods_on_instrument_id", using: :btree
    t.index ["student_id"], name: "index_lesson_periods_on_student_id", using: :btree
    t.index ["teacher_id"], name: "index_lesson_periods_on_teacher_id", using: :btree
  end

  create_table "students", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "name"
    t.integer  "family_id"
    t.index ["family_id"], name: "index_students_on_family_id", using: :btree
  end

  create_table "teachers", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "unavailable_weeks", force: :cascade do |t|
    t.date     "start_date"
    t.date     "end_date"
    t.integer  "teacher_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["teacher_id"], name: "index_unavailable_weeks_on_teacher_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "type"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "first_name"
    t.string   "last_name"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

  create_table "weeks", force: :cascade do |t|
    t.date     "start_date"
    t.date     "end_date"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "lesson",           default: true
    t.string   "week_string"
    t.integer  "lesson_period_id"
    t.integer  "lesson_length"
  end

  add_foreign_key "lesson_periods", "forms", on_delete: :cascade
  add_foreign_key "unavailable_weeks", "teachers"
end
