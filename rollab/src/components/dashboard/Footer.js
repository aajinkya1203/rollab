import React, { useEffect } from 'react';
import githubIcon from '../../images/home/GitHubIcon.svg';

function Footer() {
    useEffect(()=>{
        let temp= document.createElement('script');
        temp.src = "https://platform.twitter.com/widgets.js";
        document.getElementById("twitter-embed").appendChild(temp);
  
        let tempAnother = document.createElement('script');
        tempAnother.src = "//cdn.jsdelivr.net/github-cards/latest/widget.js";
        document.getElementById("github-embed").appendChild(tempAnother);
      },[]);
    return (
        <footer className="page-footer">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">
                    rollab
                </h5>
                <p className="grey-text text-lighten-4">
                    A project by <a href="https://github.com/aajinkya1203" className="attribute">
                        Aajinkya Singh
                    </a>
                </p>
                <p id="twitter-embed">
                  <a href="https://twitter.com/aajinkya1203?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @aajinkya1203</a>
                </p>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">
                  Made with <span role="img" aria-label="heart">❤️</span>
                </h5>                
                <ul className="col s12">
                  <li id="github-embed" className="col s12">
                    <div className="github-card" 
                      style={{
                        maxWidth:"100%",
                        height:"auto"
                      }}
                    data-github="aajinkya1203" data-height="215px" data-width="300px" data-theme="medium">
                    </div>
                  </li>
                  <li>
                    <a href="https://github.com/aajinkya1203" target="__blank">
                      <div className="chip">
                        <img src={githubIcon} alt="Contact Person" />
                        Github
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
            © 2020 Copyright rollab
            </div>
          </div>
        </footer>
    )
}

export default Footer
