import { useRouter } from "next/router"

export default function ProductPage() {
    const router = useRouter()
  const { productId } = router.query
    return <main>
        {productId}
    </main>

}