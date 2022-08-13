


class ProductService {


    async getPizza(sortType) {
        try {
            
        } catch (error) {
            
        }
    }

    async getPizzaById(id) {
      try {
        const res = await fetch(`https://62c897d28c90491c2cb80379.mockapi.io/pizza?id=${id}`)
        const data = await res.json()
  
        return data[0]
      } catch (error) {
        console.log(error)
      }
    }
}

export default new ProductService()