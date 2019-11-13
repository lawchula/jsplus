import React, { Component } from "react";
import Header from "./Header";
import "./Css/Howtouse.css";

import filterbutton from "./Images/filterbutton.png";
import filterpopup from "./Images/filterpopup.png";
import choosefilter from "./Images/choosefilter.png";
import afterchoosefilter from "./Images/afterchoosefilter.png";
import Clickexport from "./Images/Clickexport.png";

import Exportdownload from "./Images/Exportdownload.png";
import Exceldoc from "./Images/Exceldoc.JPG";
import Approval from "./Images/Approval.JPG";
import Manager2 from "./Images/Manager2.jpg";
import whitepencil from "./Images/whitepencil.png";
import whitemanage from "./Images/whitemanage.png";
import whiteexcel from "./Images/whiteexcel.png";
import whitenoti from "./Images/whitenoti.png";
import whiteedit from "./Images/whiteedit.png";
import generate1 from "./Images/generate1.png";
import generate2 from "./Images/generate2.png";
import generate3 from "./Images/generate3.png";
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
      <div className="howtouse">
        <Header />
        <div className="topnav">
          <div className="toppage">
            <div className="nav">
              <span className="navtext">How To Use : Manager</span>
            </div>
          </div>
          <div className="inpic">
            <img className="howtopic" src={Manager2}></img>
            <div className="textboxes">
              <span className="stafftopic">Manager</span>
              <br></br>
              <br></br>
              <span className="stafftext">
                In this role, you are able to set the period into your staff's
                schedule and you can manage the schedule by yourself. You are
                also able to export the schedule to the excel file for
                documentary.
              </span>
            </div>
          </div>
        </div>
        <div className="Mbenefit">
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitepencil}></img>
            </div>

            <span className="text1">
              You can create the period that you want to.
            </span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitemanage}></img>
            </div>
            <span className="text2">
              {" "}
              You can set or manage your staffs's schedule who are in your
              department.
            </span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteexcel}></img>
            </div>
            <span className="text3">
              {" "}
              You can export your schedule into excel file as a document.
            </span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitenoti}></img>
            </div>
            <span className="text4"> Notification for approving.</span>
          </div>
          <div className="deswithpic col-12" data-aos="flip-right">
            <div className="Gcircle">
              <img className="benepic" src={whiteedit}></img>
            </div>
            <span className="text4">
              {" "}
              You can generate the period to set the staff's schedule.
            </span>
          </div>
        </div>
        <br></br>

        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to create your period</u>
              <img className="titlelogo" src={whitepencil}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on filter period button</span>
              </div>
              <br></br>
              <span className="hdescription">
                When you are on schedule page, click on filter period button.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={filterbutton}></img>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">2. Filter Period popup</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click on "FILTER PERIOD POPUP" for creating period,
                there are period name, start period, end period and color that
                you must fill all of that to create your own period. After
                you've finished fill all of these, click on "Add" button. Then,
                the period that you add will show on the table below. If you
                sure to create period, please click on "Submit" button. You also
                can delete your period on the table below.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={filterpopup}></img>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to manage or set schedule.</u>
              <img className="titlelogo2" src={whitemanage}></img>
            </span>
          </div>
          <div className="col-12 blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Choose the period to staffs</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you are in schedule page, click on the blank on the
                schedule table. There will show the period that you create in
                filter period popup. You can set the period to your staffs which
                are in your department.After you are sure with the period that
                you click, then click save.
              </span>
              <br></br>
              <div className="blank">
                <div className="twopic">
                  <img className="pic" src={choosefilter}></img>
                  <img className="pic" src={afterchoosefilter}></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="col-12 htitle">
          <div className="setcenter">
            <span>
              <u>How to export schedule to excel document file.</u>
              <img className="titlelogo3" src={whiteexcel}></img>
            </span>
          </div>
        </div>

        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on "Export" button</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you've finished create the period, you only clicks on
                "Export" button. After that, Excel file will be download.
              </span>
              <br></br>
              <div className="blank">
                <div className="twopic">
                  <img className="pic" src={Clickexport}></img>
                  <img className="pic" src={Exportdownload}></img>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className=" blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">2. Check on the excel file</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click Export and dowload excel file, check on the
                excel file in your download file. The period will be the same
                with website.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Exceldoc}></img>
              </div>
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
              <img className="titlelogo4" src={whitenoti}></img>
            </span>
          </div>
          <div className="col-12 blog">
            <div className="breakline">
              <span className="htopic">
                1. Click on right upside as a "bell" icon
              </span>
            </div>
            <br></br>
            <span className="hdescription">
              You can watch the notification on the bell icon on right upside.
              It will show the approval of the staff's request. You can decide
              to approve or reject.
            </span>
            <br></br>
            <div className="blank">
              <img className="pic" src={Approval}></img>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to generate staff's schedule</u>
              <img className="titlelogo4" src={whiteedit}></img>
            </span>
          </div>
          <div className="set2boxes">
            <div className="blog">
              <div className="breakline">
                <div className="setcenter">
                  <span className="htopic">1. Click on "Generate" button</span>
                </div>
                <br></br>
                <span className="hdescription">
                  Click "GENERATE" button which is on right side of create
                  period, there will show generate popup.
                </span>
                <br></br>
                <div className="blank">
                  <img className="pic" src={generate1}></img>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="blog">
              <div className="breakline">
                <div className="setcenter">
                  <span className="htopic">2. edit the generate popup</span>
                </div>
                <br></br>
                <span className="hdescription">
                  In "Create generate condition", there have 4 dropdowns; select
                  position, select period times per days, select workers per
                  days and add the holiday that you want. You have to select the
                  dropdowns and you can add any holiday that you want by filling
                  it and click "Add" button.
                </span>
                <br></br>
                <div className="blank">
                  <img className="pic" src={generate2}></img>
                </div>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">
                  3. Click save and click generate.
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                When you've finished select all the dropdown, click save to save
                and remain your data. Then, click generate, the schedule of all
                staff will set by your condition which you select.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={generate3}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
