ENV['RAILS_ENV'] ||= 'test'

require File.expand_path('../../config/environment', __FILE__)

abort("The Rails environment is running in production mode!") if Rails.env.production?

require 'spec_helper'
require 'rspec/rails'

# Add additional requires below this line. Rails is not loaded until this point!
require 'capybara/rspec'
require 'capybara/poltergeist'
require 'devise'
require 'database_cleaner'


Dir[Rails.root.join('spec/support/**/*.rb')].each { |f| require f }

ActiveRecord::Migration.maintain_test_schema!

Capybara.register_driver :poltergeist do |app|
  Capybara::Poltergeist::Driver.new(app, :inspector => './chrome.sh', :js_errors => true)
end

Capybara.javascript_driver = :poltergeist

# Capybara.register_driver :selenium_chrome do |app|
#   Capybara::Selenium::Driver.new(app, browser: :chrome)
# end
# Capybara.javascript_driver = :webkit


# Capybara::Webkit.configure do |config|
#   # Enable debug mode. Prints a log of everything the driver is doing.
#   # config.debug = true

#   # Allow pages to make requests to any URL without issuing a warning.
#   config.allow_unknown_urls

#   # Timeout if requests take longer than 5 seconds
#   config.timeout = 20
# end


RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.include Devise::Test::ControllerHelpers, type: :controller
  config.include Devise::Test::IntegrationHelpers, type: :feature
  config.include Warden::Test::Helpers  
  
  # Remove this line if you're not using ActiveRecord or ActiveRecord fixtures
  
  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.use_transactional_fixtures = false

  # config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!

  config.before(:suite) do
    DatabaseCleaner.clean_with(:truncation)
  end

  config.before(:each) do
    DatabaseCleaner.strategy = :transaction
  end

  config.before(:each, js: true) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end
end