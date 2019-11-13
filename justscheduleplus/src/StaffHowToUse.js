import React, { Component } from "react";
import Header from "./Header";
import "./Css/Howtouse.css";
import staffhowto from "./Images/staffhowto.jpg";
import schedulepage from "./Images/schedulepage.JPG";

import whitearrow from "./Images/whitearrow.png";
import whiteeye from "./Images/whiteeye.png";
import whiteexchange from "./Images/whiteexchange.png";
import whitenoti from "./Images/whitenoti.png";
import staffhtu1 from "./Images/staffhtu1.png";
import staffhtu2 from "./Images/staffhtu2.png";
import staffhtu3 from "./Images/staffhtu3.png";
import staffhtu4 from "./Images/staffhtu4.png";
import staffhtu5 from "./Images/staffhtu5.png";
import staffhtu6 from "./Images/staffhtu6.png";
import staffhtu7 from "./Images/staffhtu7.png";
import staffhtu8 from "./Images/staffhtu8.png";
import staffhtu9 from "./Images/staffhtu9.png";
import staffhtu10 from "./Images/staffhtu10.png";
import staffhtu11 from "./Images/staffhtu11.png";
import staffhtu12 from "./Images/staffhtu12.png";
import AOS from "aos";
import "aos/dist/aos.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    AOS.init({
      duration: 2000
    });
  }

  render() {
    return (
      <div className="howtouse2">
        <Header />
        <div className="topnav">
          <div className="toppage">
            <div className="nav">
              <span className="navtext">How to use : staff</span>
            </div>
          </div>
          <div className="inpic">
            <img className="howtopic" src={staffhowto}></img>
            <div className="textboxes">
              <span className="stafftopic">STAFF</span>
              <br></br>
              <br></br>
              <span className="stafftext">
                You role is not complicated. You are able to watch your schedule
                and request for leave or exchange schedule with others.
              </span>
            </div>
          </div>
        </div>
        <div className="benefit">
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteeye}></img>
            </div>

            <span className="text1">
              You can watch your schedule all the time.
            </span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteexchange}></img>
            </div>
            <span className="text2">
              {" "}
              You can request to change schedule with others.
            </span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitearrow}></img>
            </div>
            <span className="text3"> You can request for leave.</span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitenoti}></img>
            </div>
            <span className="text4"> Notification for requests.</span>
          </div>
        </div>
        <br></br>

        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to watch schedule.</u>
              <img className="titlelogo" src={whiteeye}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className=" blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Redirect to schedule page</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you sign in, it's normally redirect to schedule page which
                will show your department, company, colleague, period, workday
                and so on.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={schedulepage}></img>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">
                  1.2. Direct to schedule page by clicking on side bar
                </span>
              </div>

              <br></br>
              <span className="hdescription">
                When you were on any page in js+, you could direct to schedule
                page by clicking on usernamedropdown and clicking on "Schedule".
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu1}></img>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to request to change schedule with other.</u>
              <img className="titlelogo" src={whiteexchange}></img>
            </span>
          </div>
        </div>
        <div className="setcenter">
          <div className="col-12 blog">
            <div className="breakline">
              <span className="htopic">1. Click on request button</span>
            </div>
            <br></br>
            <span className="hdescription">
              After you are in schedule page, click on request button and then
              watch your schedule which you want to change with another person.
            </span>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu2}></img>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">
                  2. Choose your period and colleague period
                </span>
              </div>

              <br></br>
              <span className="hdescription">
                After you click on request button, you have to choose your
                period that you want to change first. After you have click on
                your period, you have to click on your colleague's period which
                you want to change(By the rule that your both periods must not
                repeat in each other days).
              </span>
            </div>
            <br></br>
            <div className="blank">
              <div className="twopic">
                <img className="pic" src={staffhtu3}></img>
                <img className="pic" src={staffhtu4}></img>
              </div>
            </div>
          </div>

          <br></br>
          <br></br>

          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">3.Exchange Popup</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click your period and another period, it will show pop
                up for choosing the period that you want to exchage and the
                warning will show upside that which period you cannot choose.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <div className="twopic">
                <img className="pic" src={staffhtu5}></img>
                <img className="pic" src={staffhtu6}></img>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">4.Request Success</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you choose period and click confirmation, there will show
                request success and the request will be sent to manager to
                decide to approve or reject.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu7}></img>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to request for leaving.</u>
              <img className="titlelogo" src={whitearrow}></img>
            </span>
          </div>
        </div>

        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on absence button</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you are in schedule page, click on absence button and then
                watch your day and period which you want to leave.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu8}></img>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">
                  2. Choose your period which you want to leave
                </span>
              </div>

              <br></br>
              <span className="hdescription">
                After you click the absence button, you have to choose the
                period which you want to leave.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu9}></img>
            </div>
          </div>
        </div>

        <br></br>
        <br></br>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">3. Absence popup</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you choose your period, the popup will show the period and
                the reason which your wanna leave and you can choose more than 1
                periods to absence with the appropriate reason.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu10}></img>
            </div>
          </div>
          <br></br>
          <br></br>
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">4. Absence comfirmation</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click request, there will have a comfirmation to you
                to confirm. Then, the popup will show request success and the
                absence request will sent to manager to aprove it.
              </span>
            </div>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu11}></img>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>What is Notification do?.</u>
              <img className="titlelogo" src={whitenoti}></img>
            </span>
          </div>
          <div className="col-12 blog">
            <span className="htopic">
              <div className="breakline">
                1. Click on right upside as a "bell" icon
              </div>
            </span>
            <br></br>
            <span className="hdescription">
              You can watch the notification on the bell icon on right upside.
              It will show the exchange request when some people want to
              exchange schedule with you or manager approval.
            </span>
            <br></br>
            <div className="blank">
              <img className="pic" src={staffhtu12}></img>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
