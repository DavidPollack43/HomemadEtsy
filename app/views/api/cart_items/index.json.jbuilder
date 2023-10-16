@cart_items.each do |item|
    json.set! item.id do 
        json.quantity item.quantity
        json.product do 
            json.username item.product.user.username
            json.description item.product.description
            json.price item.product.price
            json.stock_quantity item.product.stock_quantity
        end
    end
end