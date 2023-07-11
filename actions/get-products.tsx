import qs from "query-string"
import { Product } from "@/types"

const url = `${process.env.NEXT_PUBLIC_API_URL}/products`

interface Query {
    categoryId?: string
    colorId?: string
    sizeId?: string
    isFeatured?: string
}

const getProducts = async (qury: Query): Promise<Product[]> => {
    const URL = qs.stringifyUrl({
        url, query: {
            colorId: qury.colorId,
            sizeId: qury.sizeId,
            categoryId: qury.categoryId,
            isFeatured: qury.isFeatured
        }
    })
    const res = await fetch(URL)
    return res.json()
}

export default getProducts