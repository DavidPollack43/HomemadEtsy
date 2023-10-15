class CreateCartItems < ActiveRecord::Migration[7.0]
  def change
    create_table :cart_items do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.references :product, null: false, foreign_key: {to_table: :products}
      t.integer :quantity, null: false
      t.timestamps
    end
    add_index :cart_items, [:user_id, :product_id], unique: true
  end
end
