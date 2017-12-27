const staging_server_url = 'https://block-party-web-server.herokuapp.com/'
const dev_server_url = 'http://localhost:5000'

REACT_APP_PROXY = REACT_APP_ENV === 'production' ? staging_server_url : dev_server_url
