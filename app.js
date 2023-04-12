const container = document.querySelector('.container')
const seatsWithOccu = document.querySelectorAll('.row .seat')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelected = document.getElementById('movie')
let ticketPrice = movieSelected.value


window.addEventListener('load', () => {
  placeSaveValue()
  updateSelectedCount()
})

// seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
    updateSelectedCount()
  }
})


function updateSelectedCount () {
  saveToLocalStroage()
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  const selectedSeatsCount = selectedSeats.length
  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount * ticketPrice
}

// 换movie之后重置价格
movieSelected.addEventListener('change', (e) => {
  ticketPrice = e.target.value
  updateSelectedCount()
})

// 将数据存到localstorage
function saveToLocalStroage () {
  // 注意.seat.selected中间不能有空格
  const selectedSeats = document.querySelectorAll('.row .seat.selected')
  // 每个选中位置的index  [...]转换成array
  // 记录选中座位的index
  const indexHolder = [...selectedSeats].map((seat) => [...seatsWithOccu].indexOf(seat))
  localStorage.setItem('selectedSeatIndex', JSON.stringify(indexHolder))
  localStorage.setItem('price', ticketPrice)
}



// 此函数，确保刷新后，之前的座位还在
function placeSaveValue () {
  // JSON.parse()【从一个字符串中解析出json对象】，为解析
  // JSON.stringify()【从一个对象中解析出字符串】，为字符串化
  // 作为 JSON 的数组,在对衍生自数组的 JSON 使用 JSON.parse() 后，此方法将返回 JavaScript 数组，而不是 JavaScript 对象。
  const preSelectedSeats = JSON.parse(
    localStorage.getItem('selectedSeatIndex'))

  console.log(preSelectedSeats)

  if (preSelectedSeats !== null && preSelectedSeats.length > 0) {
    seatsWithOccu.forEach((seat, index) => {
      // 遍历所有的座位，如果这个座位，在preSelectedSeats中存在，
      if (preSelectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
        // 就给这个位置添加属性，确保页面刷新后位置还在
      }
    })
  }

  count = preSelectedSeats.length
  price = localStorage.getItem('price')

}


