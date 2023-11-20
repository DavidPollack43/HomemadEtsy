# == Schema Information
#
# Table name: products
#
#  id             :bigint           not null, primary key
#  title          :string           not null
#  user_id        :bigint           not null
#  description    :text
#  price          :decimal(8, 2)    not null
#  stock_quantity :integer          not null
#  category_id    :bigint           not null
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#
class Product < ApplicationRecord
    validates :title, :user, :price, :category, presence: true
    validates :price, numericality: {greater_than_or_equal_to: 0}
    validates :stock_quantity, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

    belongs_to :user
    belongs_to :category

    has_many :cart_items, dependent: :destroy

    has_many :order_items, dependent: :destroy

    has_many :reviews

    has_one_attached :photo

end
