# == Schema Information
#
# Table name: order_items
#
#  id                        :bigint           not null, primary key
#  order_id                  :bigint           not null
#  product_id                :bigint           not null
#  quantity                  :integer          not null
#  price_at_time_of_purchase :decimal(8, 2)    not null
#  created_at                :datetime         not null
#  updated_at                :datetime         not null
#
class OrderItem < ApplicationRecord
    validates :order, :product, :quantity, :price_at_time_of_purchase, presence: true
    validates :price_at_time_of_purchase, numericality: {greater_than_or_equal_to: 0}
    validates :quantity, numericality: {greater_than_or_equal_to: 0}

    belongs_to :order
    belongs_to :product

end
