require "rails_helper"

RSpec.describe Family, :type => :model do

  let(:family) { Family.create( first_name: 'John', last_name: 'Smith', 
                                email: 'family@example.com',
                                password: 'password', password_confirmation: 'password') }

  it "has many forms" do
    family.save!
    expect(family.forms.length).to eq(0)
    family.forms.create(year: Date.today.year, family_id: family.id)
    expect(family.forms.length).to eq(1)
  end

  # it "orders by last name" do
  #   lindeman = User.create!(first_name: "Andy", last_name: "Lindeman")
  #   chelimsky = User.create!(first_name: "David", last_name: "Chelimsky")

  #   expect(User.ordered_by_last_name).to eq([chelimsky, lindeman])
  # end
end