@orders.each do |order|
    json.set! order.id do
        json.extract! order, :total_price, :status
        json.order_items order.order_items do |item|
            json.set! item.id do 
                json.title = item.product.title
                json.description = item.product.description
                json.price = item.product.price
                json.stock_quantity = item.product.stock_quantity
            end
        end
    end
end