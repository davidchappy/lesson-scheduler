class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session
  after_action :flash_to_http_header, if: -> { request.xhr? }

  private

  def flash_to_http_header
    return if flash.empty?
    response.headers['X-FlashMessages'] = flash.to_hash.to_json
    flash.discard
  end
end
