class CartItemsController < ApplicationController
    def index
        @cart_items = current_user.cart_items
    end

    def create
        @cart_item = current_user.cart_items.new(cart_item_params)
        if @cart_item.save
            render :index
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def update
        @cart_item = current_user.cart_items.find_by(id: params[:id])
        if @cart_item.update(cart_item_params)
            render :index
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def destroy
        @cart_item = current_user.cart_items.find_by(id: params[:id])
        if @cart_item && @cart_item.destroy
            render :index
        else
            render json: ["Cart Item could not be deleted"], status: 422
        end
    end

    private

    def cart_item_params
        params.require(:cart_item).permit(:product_id, :quantity)
    end
end