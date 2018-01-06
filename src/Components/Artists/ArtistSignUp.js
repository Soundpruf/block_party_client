import React, { Component } from 'react'
import { Button, Form, Grid, Header, Image, Container, Message, Segment, Step } from 'semantic-ui-react'
import { Checkbox } from 'semantic-ui-react'
import {Firebase} from '../../Firebase'
import Axios from 'axios'

export default class ArtistSignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      is_artist: false,
      artist_email: '',
      artist_password: '',
      artist_name: ''
    }
  }
  handleSubmit(e) {
    e.preventDefault()
    const _this = this
    const URL = process.env.NODE_ENV === 'development' ? 'http://localhost:5000/artists/signup' : 'https://block-party-server.herokuapp.com/artists/signup'
    Firebase.auth().createUserWithEmailAndPassword(this.state.artist_email, this.state.artist_password)
      .then((response) => {
        console.log(response)

        Axios({
          method: 'post',
          url: URL,
          data: {
            artist_name: _this.state.artist_name,
            email: _this.state.artist_email,
            password: _this.state.artist_password
          }
        }).then((response) => {
          console.log(response)
          const artist_id = response.data.artist.id

          localStorage.setItem('artist_id', artist_id)
          console.log(localStorage.getItem('artist_id'))

          _this.sendVerificationEmail(artist_id)

        }).catch((error) => {
          console.log(error)
        })

      })
      .catch((error) => {
        console.log(error)
        const errorCode = error.code;
        const errorMessage = error.message;

      })
  }
  sendVerificationEmail(artist_id) {

    const _this = this
    let user = Firebase.auth().currentUser

    user.sendEmailVerification().then(() => {
      console.log('email sent')
      _this.props.history.push(`${artist_id}/profile`)
    }).catch((error) => {
      console.log(error)
    })

  }
  handleArtistCheckBox(e) {
    e.preventDefault()

    console.log(e.target)
    this.setState({
      is_artist: true
    })
  }
  handleArtistEmail(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_email: e.target.value
    })
  }
  handleArtistPassword(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_password: e.target.value
    })
  }
  handleArtistName(e) {
    e.preventDefault()
    console.log(e.target.value)
    this.setState({
      artist_name: e.target.value
    })
  }
  render() {

    return (
      <div id='ArtistSignUp'>
        <Container>
       
          <Segment>
            <Step.Group fluid>
              <Step>
                <svg className="block_party_svg" id="e55d10ab-9d70-435f-9096-155c89cbb824" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="930" height="796" viewBox="0 0 930 796"><defs><linearGradient id="c2d4657d-812e-4d49-9faf-a52e325dd45c" x1="476.5" y1="796" x2="476.5" y2="356" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25" /><stop offset="0.54" stop-color="gray" stop-opacity="0.12" /><stop offset="1" stop-color="gray" stop-opacity="0.1" /></linearGradient><linearGradient id="c3547cc4-a187-4ba4-ab1a-9d4c07935ee4" x1="233" y1="468" x2="233" y2="390" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#b3b3b3" stop-opacity="0.25" /><stop offset="0.54" stop-color="#b3b3b3" stop-opacity="0.1" /><stop offset="1" stop-color="#b3b3b3" stop-opacity="0.05" /></linearGradient></defs><title>create</title><path d="M827,414s28-104-28-211" transform="translate(-135 -52)" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 23" /><line x1="300.59" y1="350.5" x2="300.59" y2="350.5" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><path d="M443.1,380.14c9.88-40.36,12.83-124.5-117.66-160.22" transform="translate(-135 -52)" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 23.61" /><line x1="179" y1="165" x2="179" y2="165" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><rect x="71" y="356" width="811" height="440" fill="url(#c2d4657d-812e-4d49-9faf-a52e325dd45c)" /><rect x="78" y="362" width="798" height="422.5" fill="#fff" /><circle cx="233" cy="429" r="39" fill="url(#c3547cc4-a187-4ba4-ab1a-9d4c07935ee4)" /><circle cx="233" cy="429" r="35" fill="#6c63ff" /><rect x="313" y="416" width="197" height="20" fill="#bdbdbd" /><rect x="232.5" y="545.5" width="492" height="20" fill="#e0e0e0" /><rect x="232.5" y="501.5" width="492" height="20" fill="#e0e0e0" /><rect x="232.5" y="589.5" width="492" height="20" fill="#e0e0e0" /><rect x="232.5" y="633.5" width="492" height="20" fill="#e0e0e0" /><rect x="232.5" y="677.5" width="492" height="20" fill="#e0e0e0" /><rect x="232.5" y="721.5" width="492" height="20" fill="#e0e0e0" /><line x1="153.33" y1="355.5" x2="153.33" y2="355.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><path d="M290.59,384.75c.76-21.62-1.88-53.94-20.78-75.41" transform="translate(-135 -52)" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 22.87" /><line x1="126.5" y1="249.5" x2="126.5" y2="249.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><line x1="605.33" y1="364.5" x2="605.33" y2="364.5" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><path d="M742.59,393.75c.76-21.62-1.88-53.94-20.78-75.41" transform="translate(-135 -52)" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 22.87" /><line x1="578.5" y1="258.5" x2="578.5" y2="258.5" fill="none" stroke="#e0e0e0" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><line x1="797.67" y1="355.5" x2="797.67" y2="355.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><path d="M930.41,384.75c-.76-21.62,1.88-53.94,20.78-75.41" transform="translate(-135 -52)" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 22.87" /><line x1="824.5" y1="249.5" x2="824.5" y2="249.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><rect y="114.78" width="111" height="60.43" fill="#6c63ff" opacity="0.7" /><rect x="608" y="73.78" width="111" height="60.43" fill="#6c63ff" opacity="0.7" /><rect x="513" y="181.78" width="111" height="60.43" fill="#6c63ff" opacity="0.7" /><rect x="83" y="127.58" width="180.78" height="98.41" fill="#6c63ff" /><rect x="749.22" y="132.58" width="180.78" height="98.41" fill="#6c63ff" /><rect x="339.71" width="180.78" height="98.41" fill="#6c63ff" /><line x1="414" y1="354.5" x2="414" y2="354.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /><path d="M557.82,384.21c6.13-21.36,10.12-55.49-9.32-90.72-24-43.51-2.42-85.9,9.85-104.36" transform="translate(-135 -52)" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" stroke-dasharray="0 24.01" /><line x1="430.5" y1="127.5" x2="430.5" y2="127.5" fill="none" stroke="#bdbdbd" stroke-linecap="round" stroke-linejoin="round" stroke-width="10" /></svg>
                <Step.Content>
                  <Step.Title>Your fans</Step.Title>
                  <Step.Description>Streaming all your media</Step.Description>
                </Step.Content>
              </Step>
              <Step>
                <svg className="block_party_svg" id="fb8cf14b-f1f1-484b-948d-ccb96f004aa6" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="878" height="737.16" viewBox="0 0 878 737.16"><defs><linearGradient id="11de5531-9568-4bfb-9c18-e1a10a1db304" x1="547.62" y1="818.58" x2="547.62" y2="81.42" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25" /><stop offset="0.54" stop-color="gray" stop-opacity="0.12" /><stop offset="1" stop-color="gray" stop-opacity="0.1" /></linearGradient><linearGradient id="c10cd1d3-5fc0-4efe-baa0-ba95b5480666" x1="808.92" y1="716.17" x2="808.92" y2="344.73" xlinkHref="#11de5531-9568-4bfb-9c18-e1a10a1db304" /><linearGradient id="2a791f43-820d-4ae5-844a-cbff8e464aa6" x1="1145.95" y1="619.95" x2="1145.95" y2="543.3" gradientTransform="translate(285.52 -638.15) rotate(43.55)" xlinkHref="#11de5531-9568-4bfb-9c18-e1a10a1db304" /><linearGradient id="2adc96ec-3dd3-4164-81a7-1d5da3da9776" x1="1228.17" y1="651.09" x2="1080.75" y2="495.98" gradientTransform="translate(285.52 -638.15) rotate(43.55)" xlinkHref="#11de5531-9568-4bfb-9c18-e1a10a1db304" /><linearGradient id="d24ec6f0-8293-4573-af7c-38f5b26c7953" x1="1200.46" y1="562.32" x2="1110.51" y2="467.69" gradientTransform="translate(285.52 -638.15) rotate(43.55)" xlinkHref="#11de5531-9568-4bfb-9c18-e1a10a1db304" /></defs><title>appreciation_2</title><path d="M622.12,512.34c-32-65.11-6.4-121.68,38.43-161.18,61.91-28.82,122.75-16,167.58,41.63,29.25-17.1,66.5-20.8,97.13-13.88,23.64-89,1.5-195.76-77.39-253.3C745.25,50.76,601.38,73.28,526.53,175.9,423.91,101.05,280,123.57,205.19,226.19s-52.33,246.49,50.29,321.34L627.11,818.58l98.55-136.53Z" transform="translate(-161 -81.42)" fill="url(#11de5531-9568-4bfb-9c18-e1a10a1db304)" /><path d="M616.72,511.71a122.83,122.83,0,1,1,212.1-124,122.39,122.39,0,0,1,89-13.76c22.6-85.11-7.55-179.13-83-234.14-98.11-71.56-235.66-50-307.22,48.08C429.52,116.38,292,137.91,220.41,236s-50,235.66,48.08,307.22L623.8,802.39l90.37-123.91Z" transform="translate(-161 -81.42)" fill="#6c63ff" /><path d="M829.54,401.7a114.94,114.94,0,0,0-198.48,116l116,198.48,198.48-116a114.94,114.94,0,1,0-116-198.48Z" transform="translate(-161 -81.42)" fill="url(#c10cd1d3-5fc0-4efe-baa0-ba95b5480666)" /><path d="M828.58,405.35A109.6,109.6,0,1,0,639.32,516l110.6,189.26,189.26-110.6a109.6,109.6,0,1,0-110.6-189.26Z" transform="translate(-161 -81.42)" fill="#e53935" /><polygon points="658.5 465.91 772.38 679.9 795.87 596.47 658.5 465.91" fill="url(#2a791f43-820d-4ae5-844a-cbff8e464aa6)" /><g opacity="0.2"><polygon points="658.5 465.91 772.38 679.9 795.87 596.47 658.5 465.91" fill="url(#2adc96ec-3dd3-4164-81a7-1d5da3da9776)" /></g><polygon points="658.5 465.91 878 568.78 795.87 596.47 658.5 465.91" fill="url(#d24ec6f0-8293-4573-af7c-38f5b26c7953)" /><polygon points="665.57 472.63 769.79 668.48 791.29 592.12 665.57 472.63" fill="#6c63ff" /><g opacity="0.2"><polygon points="665.57 472.63 769.79 668.48 791.29 592.12 665.57 472.63" /></g><polygon points="665.57 472.63 866.46 566.78 791.29 592.12 665.57 472.63" fill="#6c63ff" /><path d="M528,188l-.08-.43-.28.38C429.52,116.38,292,137.91,220.41,236c-62.5,85.69-54,201.47,14.54,277.09Z" transform="translate(-161 -81.42)" opacity="0.2" /><path d="M937.18,595.61A109.6,109.6,0,0,0,827,406.08L936,596.29Z" transform="translate(-161 -81.42)" opacity="0.2" /></svg>
                <Step.Content>
                  <Step.Title>All that Love</Step.Title>
                  <Step.Description>It add$ up. Literally</Step.Description>
                </Step.Content>
              </Step>

              <Step active>
                <svg className="block_party_svg" id="d208afe9-d246-44b1-9723-4e792280c828" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="904" height="754.77" viewBox="0 0 904 754.77"><defs><linearGradient id="d0586609-2d1f-4894-831f-bc1bf1cfe805" x1="205.5" y1="458.72" x2="205.5" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25" /><stop offset="0.54" stop-color="gray" stop-opacity="0.12" /><stop offset="1" stop-color="gray" stop-opacity="0.1" /></linearGradient><linearGradient id="dc1a1433-8955-4fce-8d84-3a5c46e8d5cb" x1="347.94" y1="120.14" x2="347.94" y2="40.02" xlinkHref="#d0586609-2d1f-4894-831f-bc1bf1cfe805" /><linearGradient id="6583b9bd-7f21-4a55-b428-c52c7257def0" x1="347.94" y1="269.14" x2="347.94" y2="189.02" xlinkHref="#d0586609-2d1f-4894-831f-bc1bf1cfe805" /><linearGradient id="d5bb9150-ad00-4040-8c31-39c92932ad3e" x1="347.94" y1="417.14" x2="347.94" y2="337.02" xlinkHref="#d0586609-2d1f-4894-831f-bc1bf1cfe805" /><linearGradient id="43ab44a3-beba-4304-ae82-955b08a7fed3" x1="660.91" y1="754.77" x2="660.91" y2="737.77" xlinkHref="#d0586609-2d1f-4894-831f-bc1bf1cfe805" /><linearGradient id="e180fe82-c096-4b7f-a7fc-e0d67eafb4b3" x1="810" y1="732" x2="810" y2="417" xlinkHref="#d0586609-2d1f-4894-831f-bc1bf1cfe805" /></defs><title>server</title><rect width="411" height="458.72" fill="url(#d0586609-2d1f-4894-831f-bc1bf1cfe805)" /><rect x="6.79" y="306.27" width="397.41" height="142.46" fill="#fff" /><rect x="39.41" y="340.06" width="15.4" height="73" fill="#64ffda" /><g opacity="0.7"><rect x="69.81" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.6"><rect x="100.22" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="130.62" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="161.02" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.4"><rect x="191.42" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.3"><rect x="221.83" y="340.06" width="15.4" height="73" fill="#64ffda" /></g><circle cx="347.94" cy="376.09" r="37.16" fill="#6c63ff" /><rect x="6.79" y="158.26" width="397.41" height="142.46" fill="#fff" /><rect x="39.41" y="192.05" width="15.4" height="73" fill="#64ffda" /><g opacity="0.7"><rect x="69.81" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.6"><rect x="100.22" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="130.62" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="161.02" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.4"><rect x="191.42" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.3"><rect x="221.83" y="192.05" width="15.4" height="73" fill="#64ffda" /></g><circle cx="347.94" cy="228.09" r="37.16" fill="#6c63ff" /><rect x="6.79" y="10.25" width="397.41" height="142.46" fill="#fff" /><rect x="39.41" y="44.05" width="15.4" height="73" fill="#64ffda" /><g opacity="0.7"><rect x="69.81" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.6"><rect x="100.22" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="130.62" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.5"><rect x="161.02" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.4"><rect x="191.42" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><g opacity="0.3"><rect x="221.83" y="44.05" width="15.4" height="73" fill="#64ffda" /></g><circle cx="347.94" cy="80.08" r="40.06" fill="url(#dc1a1433-8955-4fce-8d84-3a5c46e8d5cb)" /><circle cx="347.94" cy="229.08" r="40.06" fill="url(#6583b9bd-7f21-4a55-b428-c52c7257def0)" /><circle cx="347.94" cy="377.08" r="40.06" fill="url(#d5bb9150-ad00-4040-8c31-39c92932ad3e)" /><circle cx="347.94" cy="80.08" r="37.16" fill="#6c63ff" /><g opacity="0.7"><line x1="461" y1="158.67" x2="467" y2="158.67" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><line x1="500.38" y1="158.67" x2="667.31" y2="158.67" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="12.52 33.38" /><polyline points="684 158.67 690 158.67 690 164.67" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><line x1="690" y1="196.48" x2="690" y2="311.77" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="11.93 31.8" /><line x1="690" y1="327.67" x2="690" y2="333.67" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /></g><g opacity="0.7"><line x1="367.58" y1="611.67" x2="361.58" y2="611.64" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><line x1="328.2" y1="611.48" x2="161.28" y2="610.68" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="12.52 33.38" /><polyline points="144.58 610.61 138.58 610.58 138.62 604.58" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /><line x1="138.82" y1="573.79" x2="139.28" y2="504.52" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" stroke-dasharray="11.55 30.79" /><line x1="139.38" y1="489.12" x2="139.42" y2="483.12" fill="none" stroke="#6c63ff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" /></g><path d="M869.21,703.08s11.92,80.48,82.27,107.31h-285c70.35-26.83,82.27-107.31,82.27-107.31Z" transform="translate(-148 -72.62)" fill="#e0e0e0" /><rect x="517.09" y="737.77" width="287.65" height="17" fill="url(#43ab44a3-beba-4304-ae82-955b08a7fed3)" /><rect x="518.52" y="737.77" width="284.96" height="13.12" fill="#f5f5f5" /><path d="M1041.25,417H578.75A10.75,10.75,0,0,0,568,427.75V719.14A12.86,12.86,0,0,0,580.86,732h458.28A12.86,12.86,0,0,0,1052,719.14V427.75A10.75,10.75,0,0,0,1041.25,417Z" transform="translate(-148 -72.62)" fill="url(#e180fe82-c096-4b7f-a7fc-e0d67eafb4b3)" /><path d="M436.57,348.78H885.43a10.75,10.75,0,0,1,10.75,10.75V609a0,0,0,0,1,0,0H425.82a0,0,0,0,1,0,0V359.54A10.75,10.75,0,0,1,436.57,348.78Z" fill="#fff" /><path d="M1031.32,724.54H586.68a12.86,12.86,0,0,1-12.86-12.86V681.62h470.36v30.06A12.86,12.86,0,0,1,1031.32,724.54Z" transform="translate(-148 -72.62)" fill="#f5f5f5" /><rect x="449.07" y="369.86" width="425.65" height="210.06" fill="#6c63ff" /><polygon points="465.91 383.8 874.99 383.8 874.99 369.79 449.34 369.79 449.34 579.85 465.91 579.85 465.91 383.8" fill="#fff" opacity="0.2" /></svg>
                <Step.Content>
                  <Step.Title>BlockParty hooks it up</Step.Title>
                  <Step.Description>Every second of every listen mines the block</Step.Description>
                </Step.Content>
              </Step>

              <Step>
                <svg className='block_party_svg' id="e3866539-15f4-430f-92e8-a39661b64412" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="915.69" height="679.28" viewBox="0 0 915.69 679.28"><defs><linearGradient id="fc905628-b5a5-44d2-a4d3-c3e7b0ae88f3" x1="549.23" y1="734.77" x2="549.23" y2="126.57" gradientTransform="matrix(0.97, 0.31, -0.3, 0.99, 144.2, -171.29)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="gray" stop-opacity="0.25" /><stop offset="0.54" stop-color="gray" stop-opacity="0.12" /><stop offset="1" stop-color="gray" stop-opacity="0.1" /></linearGradient><linearGradient id="c95e1ae4-289c-4d69-a4b2-d524402207e9" x1="549.32" y1="679.28" x2="549.32" y2="233.84" gradientTransform="matrix(1, 0, 0, 1, 0, 0)" xlinkHref="#fc905628-b5a5-44d2-a4d3-c3e7b0ae88f3" /><linearGradient id="179a080d-7ec3-4ffe-a5de-62706a541b28" x1="888.78" y1="569.3" x2="888.78" y2="526.2" gradientUnits="userSpaceOnUse"><stop offset="0" stop-opacity="0.12" /><stop offset="0.55" stop-opacity="0.09" /><stop offset="1" stop-opacity="0.02" /></linearGradient><linearGradient id="70237d60-1aff-4f66-bd15-fe7ff4f620b4" x1="888.78" y1="646.14" x2="888.78" y2="603.03" xlinkHref="#179a080d-7ec3-4ffe-a5de-62706a541b28" /><linearGradient id="23a7cc45-3634-41c8-b854-b6dad7f03557" x1="741.39" y1="487.05" x2="741.39" y2="464.56" xlinkHref="#179a080d-7ec3-4ffe-a5de-62706a541b28" /><linearGradient id="8b580cf0-29ea-4363-9065-3a98b2499819" x1="949.9" y1="646.14" x2="949.9" y2="603.03" xlinkHref="#179a080d-7ec3-4ffe-a5de-62706a541b28" /><linearGradient id="64ac1773-8f45-4df6-a418-07dc494bdcee" x1="949.9" y1="569.3" x2="949.9" y2="526.2" xlinkHref="#179a080d-7ec3-4ffe-a5de-62706a541b28" /><linearGradient id="4722d46c-9d1d-46a6-8fd6-e88ecc3eaff1" x1="812.99" y1="487.05" x2="812.99" y2="464.56" xlinkHref="#179a080d-7ec3-4ffe-a5de-62706a541b28" /></defs><title>credit card</title><rect x="184.86" y="201.53" width="728.62" height="445" rx="27.5" ry="27.5" transform="translate(-243.25 71.69) rotate(-17.26)" fill="url(#fc905628-b5a5-44d2-a4d3-c3e7b0ae88f3)" /><rect x="193.72" y="205.56" width="713.76" height="429.25" rx="27.5" ry="27.5" transform="translate(-242.04 71.94) rotate(-17.26)" fill="#fff" /><rect x="155.95" y="267.86" width="713.76" height="61.56" transform="translate(-207.68 55.26) rotate(-17.26)" fill="#6c63ff" /><rect x="303.67" y="610.49" width="181.35" height="26.62" transform="translate(-309.5 34.75) rotate(-17.26)" fill="#bdbdbd" /><rect x="287.34" y="547.84" width="314.45" height="26.62" transform="translate(-288.65 46.83) rotate(-17.26)" fill="#e0e0e0" /><rect x="182.96" y="233.84" width="732.73" height="445.44" rx="27.5" ry="27.5" fill="url(#c95e1ae4-289c-4d69-a4b2-d524402207e9)" /><rect x="191.28" y="238.38" width="713.76" height="429.25" rx="27.5" ry="27.5" fill="#fff" /><rect x="247.01" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="273.63" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="300.25" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="346.84" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="373.46" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="400.08" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="446.66" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="473.29" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="499.91" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="546.49" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="573.11" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="599.73" y="305.76" width="20.8" height="59.06" fill="#e0e0e0" /><rect x="247.01" y="603.57" width="181.35" height="26.62" fill="#bdbdbd" /><rect x="247.01" y="558.65" width="314.45" height="26.62" fill="#e0e0e0" /><path d="M906.25,568.21a4.38,4.38,0,0,1,4.22-4.53h6.26V526.2H860.84v43.1h45.4Z" transform="translate(-142.16 -110.36)" fill="url(#179a080d-7ec3-4ffe-a5de-62706a541b28)" /><path d="M910.47,608.66a4.38,4.38,0,0,1-4.22-4.53V603h-45.4v43.1h55.88V608.66Z" transform="translate(-142.16 -110.36)" fill="url(#70237d60-1aff-4f66-bd15-fe7ff4f620b4)" /><rect x="718.69" y="464.56" width="45.4" height="22.49" fill="url(#23a7cc45-3634-41c8-b854-b6dad7f03557)" /><path d="M932.44,604.13a4.38,4.38,0,0,1-4.22,4.53H922v37.48h55.88V603h-45.4Z" transform="translate(-142.16 -110.36)" fill="url(#8b580cf0-29ea-4363-9065-3a98b2499819)" /><path d="M922,526.2v37.48h6.26a4.38,4.38,0,0,1,4.22,4.53v1.09h45.4V526.2Z" transform="translate(-142.16 -110.36)" fill="url(#64ac1773-8f45-4df6-a418-07dc494bdcee)" /><rect x="790.28" y="464.56" width="45.4" height="22.49" fill="url(#4722d46c-9d1d-46a6-8fd6-e88ecc3eaff1)" /><path d="M906.44,568.63a4,4,0,0,1,4-4h6V531.34h-53.3V569.6h43.31Z" transform="translate(-142.16 -110.36)" fill="#6c63ff" /><path d="M910.46,604.54a4,4,0,0,1-4-4v-1H863.13v38.27h53.3V604.54Z" transform="translate(-142.16 -110.36)" fill="#6c63ff" /><rect x="720.97" y="464.23" width="43.31" height="19.97" fill="#6c63ff" /><path d="M931.42,600.52a4,4,0,0,1-4,4h-6v33.28h53.3V599.55H931.42Z" transform="translate(-142.16 -110.36)" fill="#6c63ff" /><path d="M921.43,531.34v33.28h6a4,4,0,0,1,4,4v1h43.31V531.34Z" transform="translate(-142.16 -110.36)" fill="#6c63ff" /><rect x="789.27" y="464.23" width="43.31" height="19.97" fill="#6c63ff" /></svg>
                <Step.Content>
                  <Step.Title>Get Paid</Step.Title>
                  <Step.Description>That's right. You, my friend, get paid</Step.Description>
                </Step.Content>
              </Step>
            </Step.Group>
          </Segment>
        </Container>


        <Grid
          textAlign='center'>
          <Grid.Column style={{ maxWidth: 450 , marginTop: '20px'}}>

            <Form size='large' onSubmit={this.handleSubmit.bind(this)}>
              <Segment stacked>
                <Header as='h2' color='teal' textAlign='center'>
                  Sign Up here. We'll handle the details later
              </Header>
                <Form.Input
                  onChange={this.handleArtistName.bind(this)}
                  value={this.state.artist_name}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='Artist Name or Group Name'
                />
                <Form.Input
                  onChange={this.handleArtistEmail.bind(this)}
                  value={this.state.artist_email}
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                />
                <Form.Input
                  onChange={this.handleArtistPassword.bind(this)}
                  value={this.state.artist_password}
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                />
                <Segment compact>
                  <Checkbox value={this.state.is_artist} label='Are you an Artist or Musician?' onChange={this.handleArtistCheckBox.bind(this)} />
                </Segment>

                <Button color='teal' fluid size='large'>Create Account</Button>
              </Segment>
            </Form>
            <Message>
              <Header as='h2' color='teal' textAlign='center'>
                <em> With Streaming payouts that blow Spotify out of the water!</em>
              </Header>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
} 