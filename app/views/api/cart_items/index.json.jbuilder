@cart_items.each do |item|
    # debugger
    json.set! item.id do 
        json.id item.id
        json.quantity item.quantity
        json.product do 
            # json.username item.product.user.username
            json.productId item.product.id
            json.title item.product.title
            json.description item.product.description
            json.price item.product.price
            json.stock_quantity item.product.stock_quantity
            json.photoUrl item.product.photo.attached? ? item.product.photo.url : nil 
        end
    end
end