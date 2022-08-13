


class LocalStorageService {

    initLocalStorage() {
        if(localStorage.getItem('cart') === null) {
            localStorage.setItem('cart',JSON.stringify({
                items: [],
                totalCost: 0,
                totalItems: 0,
                details: {
                  client: {
                    name: '',
                    phone: '',
                    email: ''
                  },
                  address: {
                    street: '',
                    house: '',
                    room: '',
                    floor: '',
                    comments: ''
                  },
                  paymentType: null
                }
              }))
          }
    }

    async saveCart(cart) {
        console.log('SAVED',cart)
        localStorage.setItem('cart',JSON.stringify(cart))
    }
}


export default new LocalStorageService()