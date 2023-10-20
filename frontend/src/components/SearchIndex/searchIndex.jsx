import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProducts, getProducts } from "../../store/products";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from 'react-router-dom';
import './searchIndex.css'

export const SearchIndex = () => {
    debugger
    const dispatch = useDispatch();
    const products = useSelector(getProducts);
    const [filteredProducts, setFilteredProducts] = useState(null)
    const {search} = useParams();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [])

    useEffect(() => {
        if(products && search) {
            const newFilteredProducts = products.filter(product => 
                product.title.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredProducts(newFilteredProducts);
            console.log("filtered Products: ", filteredProducts);
        }
    }, [products, search]);

    return (
        <>
            <div className="products-container-search">
                {filteredProducts && filteredProducts.map(product => (
                    <Link to={`/products/${product.id}`} key={product.id}>
                        <div key={product.id} className="product-search">
                            <div className="productPictureDiv-search">
                                <img src={product.photoUrl} alt="productPicture" />
                            </div>
                            <h2 className="productTitle-search">{product.title}</h2>
                            <p className="productCost-search">${product.price}</p>
                            <p className="productSeller-search">{product.user.username}</p>
                            <br/>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default SearchIndex