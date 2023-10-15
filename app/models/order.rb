# == Schema Information
#
# Table name: orders
#
#  id          :bigint           not null, primary key
#  user_id     :bigint           not null
#  total_price :decimal(8, 2)    not null
#  status      :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
class Order < ApplicationRecord
    before_save :compute_total_price

    validates :user, :status, presence: true
    validates :total_price, numericality: {greater_than_or_equal_to: 0}
    enum status: { received_and_being_made: 0, in_transit: 1, delivered: 2 }

    belongs_to :user

    has_many :order_items, dependent: :destroy

    def compute_total_price
            calculated_total = order_items.sum("price_at_time_of_purchase * quantity")
            self.total_price = calculated_total.round(2)
    end
end
