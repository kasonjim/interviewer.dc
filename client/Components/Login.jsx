import React from 'react'
import AuthService from '../Services/AuthService.js'

export class Login extends React.Component {

  render() {

    console.log('props', this.props);
    const { auth } = this.props.routes[1]

    return (
      <div className="splash">
        <nav className="splash-nav blue darken-3">
          <div className="nav-wrapper">
            <a href="#" className="brand-logo center">Interviewer Direct Connection</a>
            <ul className="right"><li><button onClick={auth.login.bind(this)} className="right" className="btn waves-effect waves-light indigo darken-4">Sign In</button></li></ul>
          </div>
        </nav>

        <div className="row splash-header-row center-align grey lighten-2">

          <img src="client/assets/splash-header.jpg" className="responsive-img splash-header" alt="Interviewer.DS Logatron" />

        </div>
        <div className="container login center-align">

          <div className="row">

            <div className="col s12 m4">
              <span className="glyphicons glyphicons-facetime-video x4 splash-icons"></span>
              <h5>Video-Interviewing Platform</h5>
              <p>Conduct interviews in a carefully-designed web platform full of features such as recording, white boarding, and code sharing. Early arrivals will also be greeted by a waiting page in the room lobby until the interviewer begins the meeting.</p>
            </div>
            <div className="col s6 m4">
              <span className="glyphicons glyphicons-calendar x4 splash-icons"></span>
              <h5>Google Calendar Integration</h5>
              <p>Now integrated with Google Calendar for easy scheduling and sharing. Bypass a proprietary event management system calendar and use Google Calendar for easy scheuling, sharing, and and updating.</p>
            </div>
            <div className="col s6 m4">
              <span className="glyphicons glyphicons-envelope x4 splash-icons"></span>
              <h5>Email Notification System</h5>
              <p>Send email notifications when meetings are created, updated, or deleted. Email integration allows for complete oversight of meetings for both the interviewer and the interviewee, reducing no-shows and miscommunication.</p>
            </div>

          </div>

        </div>
      </div>
    )
  }
}

export default Login;
