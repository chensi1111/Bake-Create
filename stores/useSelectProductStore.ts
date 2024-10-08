export const useSelectProductStore = defineStore('selectProduct', () => {
  const birthdayCake = ref(false)
  const secondDessert = ref()
  const productName = ref()
  const productPrice = ref()
  const productSource = ref()
  const productTime = ref()
  const birthday = ref([
    {
      name: '生日蛋糕',
      price: 0,
      source: 'birthdayCake',
      time: 2,
      material: {
        main: '伯爵戚風蛋糕',
        filling: '伯爵茶凍、焦糖鮮奶油',
        decoration: '鮮奶油、造型糖片'
      }
    }
  ])
  const moonFestival = ref([
    {
      name: '中秋月餅',
      price: 500,
      source: 'moonCake',
      time: 2.5,
      material: {
        main: '酥皮',
        filling: '紅豆沙、鹹蛋黃、五仁',
        decoration: '蛋黃'
      }
    },
    {
      name: '蛋黃酥',
      price: 500,
      source: 'eggYolkCake',
      time: 2.5,
      material: {
        main: '酥皮',
        filling: '鹹蛋黃、豆沙、蛋黃',
        decoration: '蛋黃液、芝麻'
      }
    }
  ])
  const cakes = ref([
    {
      name: '紅絲絨蛋糕',
      price: 900,
      source: 'redVelvetCake',
      time: 3,
      material: {
        main: '戚風蛋糕',
        filling: '奶油芝士',
        decoration: '奶油芝士霜、紅絲絨碎片'
      }
    },
    {
      name: '紅蘿蔔蛋糕',
      price: 650,
      source: 'carrotCake',
      time: 3,
      material: {
        main: '海綿蛋糕',
        filling: '奶油芝士',
        decoration: '奶油芝士霜、堅果'
      }
    },
    {
      name: '巧克力起司蛋糕',
      price: 800,
      source: 'chocolateCheeseCake',
      time: 3,
      material: {
        main: '芝士蛋糕',
        filling: '奶酪層',
        decoration: '奶油奶酪霜、巧克力醬、巧克力片'
      }
    },
    {
      name: '檸檬蛋糕',
      price: 800,
      source: 'lemonCake',
      time: 3,
      material: {
        main: '海綿蛋糕',
        filling: '檸檬醬',
        decoration: '檸檬糖霜、檸檬皮屑'
      }
    },
    {
      name: '提拉米蘇蛋糕',
      price: 900,
      source: 'tiramisuCake',
      time: 3,
      material: {
        main: '手指餅乾',
        filling: '馬斯卡彭奶酪混合物',
        decoration: '可可粉、巧克力片'
      }
    }
  ])
  const pies = ref([
    {
      name: '蘋果派',
      price: 650,
      source: 'applePie',
      time: 3,
      material: {
        main: '派皮',
        filling: '蘋果',
        decoration: '派皮屑、蛋液'
      }
    },
    {
      name: '檸檬派',
      price: 650,
      source: 'lemonPie',
      time: 3,
      material: {
        main: '派皮',
        filling: '草莓',
        decoration: '派皮屑、蛋液'
      }
    },
    {
      name: '草莓派',
      price: 900,
      source: 'strawberryPie',
      time: 3,
      material: {
        main: '派皮',
        filling: '檸檬汁、檸檬皮',
        decoration: '鮮奶油、鮮奶油、檸檬皮屑'
      }
    }
  ])
  const snacks = ref([
    {
      name: '巧克力餅乾',
      price: 500,
      source: 'chocolateCookie',
      time: 2,
      material: {
        main: '巧克力餅乾 ',
        filling: '巧克力塊',
        decoration: '巧克力碎片'
      }
    },
    {
      name: '巧克力甜甜圈',
      price: 500,
      source: 'chocolateDonut',
      time: 2,
      material: {
        main: '巧克力甜甜圈',
        filling: '巧克力醬',
        decoration: '巧克力糖霜、巧克力片'
      }
    },
    {
      name: '肉桂捲',
      price: 500,
      source: 'cinnamonRolls',
      time: 2.5,
      material: {
        main: '肉桂捲 ',
        filling: '肉桂糖混合物',
        decoration: '奶油奶酪霜'
      }
    },
    {
      name: '咖啡起司蛋糕',
      price: 500,
      source: 'coffeeCheeseCake',
      time: 2.5,
      material: {
        main: '芝士蛋糕',
        filling: '咖啡奶酪層',
        decoration: '鮮奶油、咖啡豆'
      }
    },
    {
      name: '咖啡甜甜圈',
      price: 500,
      source: 'coffeeDonut',
      time: 2,
      material: {
        main: '咖啡甜甜圈',
        filling: '咖啡醬',
        decoration: '咖啡糖霜、咖啡豆'
      }
    },
    {
      name: '雞蛋馬芬',
      price: 500,
      source: 'eggMuffins',
      time: 2.5,
      material: {
        main: '蛋類馬芬',
        filling: '無',
        decoration: '奶油、巧克力豆'
      }
    },
    {
      name: '堅果餅乾',
      price: 500,
      source: 'nutCookie',
      time: 2,
      material: {
        main: '堅果餅乾',
        filling: '乾果',
        decoration: '堅果'
      }
    }
  ])
  const allProducts = computed(() => {
    return [...moonFestival.value, ...cakes.value, ...pies.value, ...snacks.value]
  })

  return {
    birthdayCake,
    productName,
    productPrice,
    productSource,
    productTime,
    birthday,
    moonFestival,
    cakes,
    pies,
    snacks,
    secondDessert,
    allProducts
  }
})
