class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.text :description
      t.decimal :price, null: false, precision: 8, scale: 2
      t.integer :stock_quantity
      t.references :category, null: false, foreign_key: {to_table: :categories}

      t.timestamps
    end
  end
end
