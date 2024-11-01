import { Link, useLocation } from "react-router-dom";
import "./AuthLayout.css";
import AuthImage from "../assets/images/authImage.jpg"
import Logo from "../assets/images/logo.png";

export const AuthLayout = (props) => {
  const location = useLocation();
  const pathname = location?.pathname;
  const [, firstSegment] = pathname.split("/");

  return (
    <>
      <section className="authBg">
        <div className="container-fluid">
          <div className="row g-0 justify-content-center authBox">
            <div className="col-lg-5">
              <div className="authFormWrapper ms-lg-5">
                <div className="authForm">
                  <div className="authLogo">
                    <img src={Logo} alt="authLogo" />
                  </div>
                  <div className="authFormHeader">
                    <h2 className="authTitle">{props?.authTitle}</h2>
                    {props?.authMain && <p className="authPara">{props?.authPara}</p>}
                  </div>
                  {props?.children}
                  {props?.backOption && (
                    <div className="text-center mt-4">
                      <Link to={`/${firstSegment}`} className="backToLogin">
                        Back To Login
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-7 d-none d-lg-block justify-content-end">
              <div className="authBackground ms-5 me-3">
                <img src={AuthImage} alt="authImage" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
