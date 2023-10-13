class ChangeStockQuantityInProducts < ActiveRecord::Migration[7.0]
  def change
    change_column_null :products, :stock_quantity, false
  end
end
