class CreateOrderItems < ActiveRecord::Migration[7.0]
  def change
    create_table :order_items do |t|
      t.references :order, null: false, foreign_key: {to_table: :orders}
      t.references :product, null: false, foreign_key: {to_table: :products}
      t.integer :quantity, null: false
      t.decimal :price_at_time_of_purchase, null: false, precision: 8, scale: 2
      t.timestamps
    end
  end
end
