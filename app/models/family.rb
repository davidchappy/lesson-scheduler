class Family < User
  before_create :set_amount_owed

	has_many :forms

  private

    def set_amount_owed
      self.amount_owed = 0
    end
end