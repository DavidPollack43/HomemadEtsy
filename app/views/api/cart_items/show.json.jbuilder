json.quantity @cart_item.quantity
json.product do 
    json.username @cart_item.product.user.username
    json.description @cart_item.product.description
    json.price @cart_item.product.price
    json.stock_quantity @cart_item.product.stock_quantity
end