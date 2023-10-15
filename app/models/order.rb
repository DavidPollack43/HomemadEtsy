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
end
