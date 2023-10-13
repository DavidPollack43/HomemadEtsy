class Api::ProductsController < ApplicationController
  def index
    @products = Product.all
    render :index
  end

  def create
    @product = Product.new(product_params)

    if @product.save
      render :show
    else
      render json: @post.errors.full_messages, status: 422
    end
  end

  def show
    @product = Product.includes(:category, :user).find_by(id: params[:id])
    render :show
  end

  def update
  end

  def destroy
  end

  private
  def product_params
      params.require(:product).permit(:title, :price, :description, :stock_quantity)
  end
end
