document.addEventListener('DOMContentLoaded', () => {
  // Obtendo referências aos elementos HTML que precisamos interagir
  const locationInput = document.getElementById('locationInput')
  const searchButton = document.getElementById('searchButton')
  const weatherInfo = document.getElementById('weather-info')

  // Adicionando um ouvinte de evento de clique ao botão 'Pesquisar'
  searchButton.addEventListener('click', () => {
    // Obtendo a localização digitada pelo usuário
    const location = locationInput.value

    // Inserindo a chave da API obtida no site do OpenWeatherMap https://home.openweathermap.org/api_keys
    const apiKey = '73bcb72ed9d725f876835a56f4313746'

    // Construindo a URL com a localização e a chave de API
    // const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`

    console.log('URL da API:', apiUrl)

    // Fazendo uma solicitação fecth para a API do OpenWeatherMap
    fetch(apiUrl)
      .then(response => response.json()) // Transformando a resposta em JSON
      .then(data => {
        console.log('Dados da API:', data)
        // Extraindo dados relevantes da resposta JSON
        if (data.cod === 200) {
          const temperature = data.main.temp
          const description = data.weather[0].description
          const cityName = data.name

          // Criando um HTML com as informações do tempo
          const weatherHTML = `
        <h2>${cityName}</h2>
        <p>Temperatura: ${temperature}</p>
        <p>Descrição: ${description}</p>
        `

          // Exibindo as informações do tempo na página
          weatherInfo.innerHTML = weatherHTML
        } else {
          console.error('Erro ao buscar dados do tempo:', data.message) // Adicione este console.log
          weatherInfo.innerHTML = 'Erro ao buscar dados do tempo'
        }
      })
      .catch(error => {
        console.error('Erro ao buscar dados do tempo', error)
      })
  })
})
