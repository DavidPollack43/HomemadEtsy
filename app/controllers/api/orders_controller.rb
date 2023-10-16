class Api::OrdersController < ApplicationController
  def index
    @orders = current_user.orders.includes(order_items: :product)
    render :index
  end

  def create
    @order = current_user.orders.new()

    if @order.save
      render :show
    else
      render json: @order.errors.full_messages, status: 422
    end
  end

  def show
    @order = Order.includes(order_items: :product).find_by(id: params[:id])
    if @order
      render :show
    else
      render json: ["Order not found"], status: 404
    end
  end

  def destroy
    @order = current_user.orders.find_by(id: params[:id])
    if @order && @order.destroy
      render :index
    else
      render json: ["Order not found"], status: 404 unless @order
    end
  end
end
