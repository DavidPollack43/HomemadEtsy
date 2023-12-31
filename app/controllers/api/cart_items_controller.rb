class Api::CartItemsController < ApplicationController
    def index
        # debugger
        @cart_items = current_user.cart_items.includes(product: :user)
        render :index
    end

    def create
        # debugger
        # @current_user
        @cart_item = current_user.cart_items.new(cart_item_params)
        # debugger
        if @cart_item.save
            render :show
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def show 
        @cart_item = current_user.cart_item.includes(product: :user).find_by(id: params[:id])
        if @cart_item
            render :show
        else
            render json: ["Product is not found"], status: 404
        end
    end

    def update
        @cart_item = current_user.cart_items.find_by(id: params[:id])
        # debugger
        if @cart_item.update(cart_item_params)
            render :show
        else
            render json: @cart_item.errors.full_messages, status: 422
        end
    end

    def destroy
        @cart_item = current_user.cart_items.find_by(id: params[:id])
        if @cart_item && @cart_item.destroy
            render json: ["Cart Item deleted"]
        else
            render json: ["Cart Item could not be deleted"], status: 422
        end
    end

    private

    def cart_item_params
        params.require(:cart_item).permit(:product_id, :quantity)
    end
end