import React, { Component } from "react";
import Header from "./Header";
import "./Css/Howtouse.css";

import Adminpic from "./Images/Adminpic.jpg";

import whitepencil from "./Images/whitepencil.png";

import whiteexcel from "./Images/whiteexcel.png";

import whitedepartment from "./Images/whitedepartment.png";
import whiteaddstaff from "./Images/whiteaddstaff.png";
import mail from "./Images/mail.png";
import whiteedit from "./Images/whiteedit.png";
import Editpage from "./Images/Editpage.png";
import Editpage2 from "./Images/Editpage2.png";

import createdepart2 from "./Images/createdepart2.png";

import editdepart1 from "./Images/editdepart1.png";
import editdepart2 from "./Images/editdepart2.png";
import add from "./Images/add.png";
import Departmanage from "./Images/Departmanage.png";
import Departaddstaff from "./Images/Departaddstaff.png";
import Departaddstaff2 from "./Images/Departaddstaff2.png";
import Positionbutton from "./Images/Positionbutton.png";
import PositionCreate from "./Images/PositionCreate.png";
import editOrremove from "./Images/editOrremove.png";

import Departmentpage from "./Images/Departmentpage.png";
import importexcel1 from "./Images/importexcel1.png";
import importexcel2 from "./Images/importexcel2.png";
import importexcel3 from "./Images/importexcel3.png";
import importexcel4 from "./Images/importexcel4.png";
import AOS from "aos";
import "aos/dist/aos.css";

class Home extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    AOS.init({
      duration: 3000
    });
  }

  render() {
    return (
      <div className="howtouse3">
        <Header />
        <div className="topnav">
          {/* <div className="toppage">
            <div className="nav">
              <span className="navtext">How To Use : Admin</span>
            </div>
          </div> */}
          <div className="inpic">
            <img className="howtopic" src={Adminpic}></img>
            <div className="admintextboxes">
              <span className="stafftopic">Admin</span>
              <br></br>
              <br></br>
              <span className="stafftext">
                In this role, you are able to create department, manage
                department and all of user in your department. The most
                important, you are able to manage the user in the department
                such as import user, edit user and granted role to use.
              </span>
            </div>
          </div>
        </div>
        <div className="Adbenefit">
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitepencil}></img>
            </div>

            <span className="text1">You can edit your own company.</span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={add}></img>
            </div>
            <span className="text2"> You can create your own department.</span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whitedepartment}></img>
            </div>
            <span className="text3"> You can edit your department.</span>
          </div>
          <div className="deswithpic col-3" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={mail}></img>
            </div>
            <span className="text5">
              You can add staffs by add email and name.
            </span>
          </div>

          <div className="deswithpic col-4" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteaddstaff}></img>
            </div>
            <span className="text5">
              {" "}
              You can add the position that you want.
            </span>
          </div>
          <div className="deswithpic col-4" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteedit}></img>
            </div>
            <span className="text5">
              {" "}
              You can edit or remove user that you want.
            </span>
          </div>
          <div className="deswithpic col-4" data-aos="flip-right">
            <div className="circle">
              <img className="benepic" src={whiteexcel}></img>
            </div>
            <span className="text5">
              {" "}
              You can import staff to website by importing excel.
            </span>
          </div>
        </div>
        <br></br>

        <div className="setcenter">
          <div className="col-12 htitle">
            <span>
              <u>How to edit your own company</u>
              <img className="titlelogo" src={whitepencil}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on "Edit" button</span>
              </div>
              <br></br>
              <span className="hdescription">
                When you are on admin company page, click edit button for
                editing company name, email name and telno.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Editpage}></img>
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
                <span className="htopic">2. Edit name</span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click edit, you can edit company name, email name,
                telno and when you've finished, you have to click save.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Editpage2}></img>
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
              <u>How to create your own department.</u>
              <img className="titlelogo2" src={add}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="setcenter">
            <div className="blog">
              <div className="breakline">
                <span className="htopic">
                  1. Click on "create department" button
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                Click "create department" button, after that, there are
                department name, telephone number and upload picture. If you
                want to confirm, click "create new department".
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={createdepart2}></img>
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
                <span className="htopic">
                  2. Fill the department name and telephone number
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                You can fill or change department name and telephone number. If
                you want to confirm, click save.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={editdepart2}></img>
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
              <u>How to edit your own department.</u>
              <img className="titlelogo5" src={whitedepartment}></img>
            </span>
          </div>
        </div>

        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on "Edit" button</span>
              </div>
              <br></br>
              <span className="hdescription">
                Click edit button in the department box.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={editdepart1}></img>
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
                <span className="htopic">
                  2. Fill the department name and telephone number
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                You can fill or change department name and telephone number. If
                you want to confirm, click save.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={editdepart2}></img>
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
              <u>How to add staff to the department by email and name.</u>
              <img className="titlelogo4" src={mail}></img>
            </span>
          </div>
          <div className="set2boxes">
            <div className="blog">
              <div className="breakline">
                <div className="setcenter">
                  <span className="htopic">1. Click on "Manage" link</span>
                </div>
                <br></br>
                <span className="hdescription">
                  Click "Manage" link on department box, you will redirect to
                  department page.
                </span>
                <br></br>
                <div className="blank">
                  <img className="pic" src={Departmanage}></img>
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
                  <span className="htopic">2. click "Add Staff+" button</span>
                </div>
                <br></br>
                <span className="hdescription">
                  When you are redirect to department page, click on "Add
                  Staff".
                </span>
                <br></br>
                <div className="blank">
                  <img className="pic" src={Departaddstaff}></img>
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
                  3. Fill the name, surname, email, telno.
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                After you click "Add staff", there are name, surename, email,
                telno blank to fill.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Departaddstaff2}></img>
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
              <u>How to add the position.</u>
              <img className="titlelogo2" src={whiteaddstaff}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click on "Position" button</span>
              </div>
              <br></br>
              <span className="hdescription">
                Click the "Position" button. Then, there will show "create
                position" popup.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Positionbutton}></img>
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
                <span className="htopic">2. Add Position name</span>
              </div>
              <br></br>
              <span className="hdescription">
                After the "Create Position" is appear, fill position name and
                click "Add" button. You can add more than 1 position. When
                you've finished add position name, click save.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={PositionCreate}></img>
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
              <u>How to edit or remove user.</u>
              <img className="titlelogo2" src={whiteedit}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Go to department page </span>
              </div>
              <br></br>
              <span className="hdescription">
                Click "Manage" link to redirect to department page.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Departmentpage}></img>
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
                <span className="htopic">2. Click remove or edit</span>
              </div>
              <br></br>
              <span className="hdescription">
                If you want to edit or remove, click on right side in department
                page. there have both of remove or edit button.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={editOrremove}></img>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

        <div className="setcenter">
          <div className="blog">
            <div className="breakline">
              <span className="htopic">
                3. Fill the name, surname, email, telno.
              </span>

              <br></br>
              <span className="hdescription">
                After you click "Add staff", there are name, surename, email,
                telno blank to fill.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={Departaddstaff2}></img>
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
              <u>How to import staff from excel.</u>
              <img className="titlelogo2" src={whiteexcel}></img>
            </span>
          </div>
        </div>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">1. Click "Import" button</span>
              </div>
              <br></br>
              <span className="hdescription">
                Click "Import" button to import excel file in the format of
                ".xlsx" from your computer.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={importexcel1}></img>
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
                <span className="htopic">2. there must be ".xlsx file"</span>
              </div>
              <br></br>
              <span className="hdescription">
                Browse .xlsx file from your computer.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={importexcel2}></img>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="set2boxes">
          <div className="blog">
            <div className="breakline">
              <div className="setcenter">
                <span className="htopic">3. Check the format.</span>
              </div>
              <br></br>
              <span className="hdescription">
                The format of .xlsx must be align the same with department page
                ; name, surname, hotmail, telno.
              </span>
              <br></br>

              <div className="blank">
                <img className="pic" src={importexcel3}></img>
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
                <span className="htopic">
                  4. Check the format and click "save"
                </span>
              </div>
              <br></br>
              <span className="hdescription">
                When you checked format from excel that is the same with
                website. If you've confirmed, click save.
              </span>
              <br></br>
              <div className="blank">
                <img className="pic" src={importexcel4}></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
