fetch('http://puzzle.mead.io/puzzle').then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const WeatherForm = document.querySelector('form')
const SearchKey = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

messageTwo.textContent = ''
messageOne.textContent = ''


WeatherForm.addEventListener('submit', (e)=> {
e.preventDefault()
const location = SearchKey.value

messageOne.textContent = 'Loading...'
messageTwo.textContent = ''


fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)+'').then((response)=>{
    response.json().then((data)=>{

        if(data.error)
        {
            
            messageOne.textContent = data.error
        }
        else{
            messageOne.textContent = data.forecast
            messageTwo.textContent = data.place_name
            
        }
        
    })
})

})