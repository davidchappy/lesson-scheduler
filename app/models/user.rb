class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  include ApplicationHelper

  validates_presence_of :first_name
  validates_presence_of :last_name

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  before_create :set_default_role

  private

  	def set_default_role
  		self.type ||= 'Family'
  	end
end
