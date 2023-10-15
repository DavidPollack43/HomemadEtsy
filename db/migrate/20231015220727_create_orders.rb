class CreateOrders < ActiveRecord::Migration[7.0]
  def change
    create_table :orders do |t|
      t.references :user, null: false, foreign_key: {to_table: :users}
      t.decimal :total_price, null: false, precision: 8, scale: 2
      t.string :status, null: false
      t.timestamps
    end
  end
end
