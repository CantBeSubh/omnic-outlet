import getProduct from "@/actions/get-product"
import getProducts from "@/actions/get-products"
import Gallary from "@/components/galary"
import Info from "@/components/info"
import ProductList from "@/components/product-list"
import Container from "@/components/ui/container"
import { Separator } from "@/components/ui/separator"

interface ProductPageProps {
    params: {
        productId: string
    }
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
    const product = await getProduct(params.productId)
    const suggestedProducts = await getProducts({
        categoryId: product.category.id,
    })
    const sProducts = suggestedProducts.sort((a, b) => a.name.localeCompare(b.name)).map((product) => {
        // @ts-ignore
        // const { Image, ...rest } = product
        // return {
        //     ...rest,
        //     images: Image
        // }
        return product
    })

    return (
        <div className="bg-white">
            <Container>
                <div className="px-4 py-10 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                        {/* @ts-ignore */}
                        <Gallary images={product.images} />
                        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                            {/* <Separator orientation="vertical" /> */}
                            <Info data={product} />
                        </div>
                    </div>
                    <Separator className="my-10" />
                    {/* @ts-ignore */}
                    <ProductList title="Related Products" items={sProducts} />
                </div>
            </Container>
        </div>
    );
}

export default ProductPage;