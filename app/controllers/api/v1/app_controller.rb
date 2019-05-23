class Api::V1::AppController < Api::V1::BaseController
  include ApplicationHelper
  before_action :eliminate_old_profiles, :eliminate_old_unavailable_weeks

  def index
    @family = nil
    if current_user.type === 'Admin' && params["family_id"]
      @family = Family.find(params["family_id"])
    else
      @family = Family.find(current_user.id)
    end
    @instruments = JSON.parse(Instrument.all.order(:created_at).to_json(include: :teachers))
    @teachers = JSON.parse(Teacher.all.order(:created_at).to_json(include: [:instruments, :unavailable_weeks]))
    @students = @family.students
    @form = @family.find_or_create_current_form
    @lesson_periods = @form.lesson_periods.order(:created_at)
    @weeks = LessonPeriod.get_weeks_as_hash(@lesson_periods)
    @app_settings = AppSetting.all.index_by(&:key)
    @content_entries = ContentEntry.all.index_by(&:key)
    @all_setting_profiles = SettingProfile.all.order(:created_at)

    # replace general app settings with custom settings
    setting_profiles = @family.setting_profiles.all.order(:created_at)
    setting_profiles.each do |profile|
      profile_settings = profile.custom_settings.all.index_by(&:key)
      profile_settings.each do |key, setting|
        @app_settings[key] = setting
      end
    end

    # Timestamp this family's last_seen
    @family.last_seen = Date.today.strftime("%Y-%m-%d").to_s if current_user.type == 'Family'
    @family.save
    @family = JSON.parse(@family.to_json(include: :setting_profiles))

    respond_with  instruments: @instruments, teachers: @teachers,
                  family: @family, students: @students, form: @form,
                  lesson_periods: @lesson_periods, weeks: @weeks,
                  messages: flash_messages, app_settings: @app_settings,
                  content_entries: @content_entries, setting_profiles: @all_setting_profiles
  end

  # Used for admin 'reseting app', ie eliminating Forms and their dependents
  # This is not super secure but is protected by (Devise) authentication
  def reset_app
    if current_user.type == 'Admin'
      # Also eliminates all lesson_periods and weeks
      Form.destroy_all
      redirect_to root_url
    else
      respond_with messages: 'Only Admins may use this feature'
    end
  end

  private

    def eliminate_old_profiles
      profiles = SettingProfile.all
      profiles.each do |profile|
        profile.families.destroy_all if profile.expiration < Date.today
      end
    end

    def eliminate_old_unavailable_weeks
      unavailable_weeks = UnavailableWeek.all

      unavailable_weeks.each do |week|
        week.destroy if week.start_date.year != Date.today.year
      end
    end

end