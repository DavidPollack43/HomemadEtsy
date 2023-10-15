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
end
