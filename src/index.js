import React from 'react'
import MenuSlide from 'react-burger-menu/lib/menus/slide'
import SearchBar from './SearchBar'
import { Link, hashHistory } from 'react-router'

import logo from './da-logo.svg'
import './header.css'
import './SearchBar/searchbar.css'
import './uikit.css'
import './application-side-menu.css'

class Header extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        isOpen: false,
        isProfileOpen: false,
        isHelpOpen: false,
        inboxUrl: this.props.inboxUrl || "/inbox"
      }
      this.showInbox = this.props.showInbox
    }

    componentDidMount = () => {
      this.highlightHeader()
    };

    componentWillReceiveProps = (nextProps) => {
      this.highlightHeader()
    }

    highlightHeader = () => {
        // DOM manipulation for showing current header item
        let links = document.querySelectorAll('div[class="top-menu-header"] a')
        if(links){
          let curlink = document.querySelector('div[class="top-menu-header"] a[href="' + document.location.hash + '"]')
          for (let i=0; i<links.length;i++){
            links[i].classList.remove('current')
          }
          if (curlink) {
            curlink.className = curlink.className + (' current')
          }
        }
      this.showMenuContext()
    }



    onProfileClick = (e) => {
      // attach/remove event handler
      if (!this.state.isProfileOpen ) {
        document.addEventListener('click', this.handleOutsideClickProfile, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickProfile, false);
      }

      this.setState((prevState, props) => ({
        isProfileOpen:!this.state.isProfileOpen
      }))
    }

    onHelpClick = (e) => {
      // attach/remove event handler
      if (!this.state.isHelpOpen) {
        document.addEventListener('click', this.handleOutsideClickHelp, false);
      } else {
        document.removeEventListener('click', this.handleOutsideClickHelp, false);
      }

      this.setState((prevState, props) => ({
        isHelpOpen:!this.state.isHelpOpen
      }))
    }

    handleOutsideClickProfile = (e) => {
      this.onProfileClick(e)
    }

    handleOutsideClickHelp = (e) => {
      this.onHelpClick(e)
    }

    onclick = () => {
      this.setState((prevState, props) => ({
        isOpen:!this.state.isOpen
      }))
    }

    showMenuContext = () => {
      // DOM manipulation for showing current manu item
      let links = document.querySelectorAll('nav[class="global-menu"] a')
      if(links){
        let curlink = document.querySelector('nav[class="global-menu"] a[href="' + document.location.hash + '"]')
        for (let i=0;i<links.length;i++){
          links[i].className = ''
        }
        if (curlink) {
          curlink.className = 'current'
        }
      }
    }

    render() {
      return (
      <div className={(window.IS_STAFF) ? "staff-header header":"header"}>
        <div className="side-menu-container">
          <MenuSlide isOpen={ this.state.isOpen } className="bm-menu" width={ '50%' } onClick={this.onclick}>
            <div className="side-menu">
              {this.props.menu}
            </div>
          </MenuSlide>
        </div>
        <div className="top-menu-header">
          <div className="top-links-wrapper">
            <div className="top-links main-block">
              <ul>
                <li className="home-portal">
                {window.IS_STAFF &&
                  <a href="/staff-portal" className="staff-home-link">Staff portal</a>
                }
                {!window.IS_STAFF &&
                  <a href="/portal" className="staff-home-link">Client portal</a>
                }
                </li>

                <li className="header-app-name">{this.props.name}</li>
                <li className="autocomplete-li-link-search">
                  {this.props.searchArray &&
                    <SearchBar
                      searchArray={this.props.searchArray}
                      searchKey={this.props.searchKey}
                      searchDisplayAttributes={this.props.searchDisplayAttributes}
                    />
                  }
                </li>
                <li className="header-app-inbox-container">
                  {this.showInbox &&
                    <Link to={this.state.inboxUrl} onClick={this.highlightHeader} className="header-app-inbox">
                      {this.props.unreadCount > 0 &&
                        <span className={"unread-count" + (this.props.unreadCount > 99 ? " medium" : '')}>
                          <span>{this.props.unreadCount > 0 ? this.props.unreadCount : '' }</span>
                        </span>
                      }
                    </Link>
                  }
                </li>
                {this.props.helpPages && this.props.helpPages.length > 0 &&
                  <li className="header-app-help target-caret"><Link className="target-help" onClick={this.onHelpClick}><span ></span></Link></li>
                }
                <li className="header-app-username target-caret">
                  <Link className="profile-container" title={this.props.userName} onClick={this.onProfileClick}>
                    <span className="desktop-profile">{this.props.userName}</span>
                    <span className="mobile-profile"></span>
                  </Link>
                </li>
              </ul>

              {this.state.isProfileOpen &&
                <div className="target-profile-content" ref={node => { this.node = node; }}>
                  {this.props.abn &&
                    <p>ABN: {this.props.abn}</p>
                  }
                  {this.props.logonId &&
                    <p>Login ID: {this.props.logonId}</p>
                  }
                  {this.props.orgName &&
                    <p>Org Name: {this.props.orgName}</p>
                  }
                  {this.props.otherInfo  &&
                    this.props.otherInfo.map ((info) =>
                      <p key={info.label + info.value}> {info.label}: {info.value}</p>
                    )
                  }
                  {this.props.otherLinks  &&
                    <ul>
                    {this.props.otherLinks.map ((otherLink) =>
                      <li className="other-links-li" key={otherLink.label + otherLink.value} ><a href={otherLink.value.indexOf("http")>-1 ? otherLink.value : "#"+otherLink.value}>{otherLink.label}</a></li>
                    )}
                    </ul>
                  }
                  <ul>
                    <li className="logout-li-link-staff"><a href="/auth/faces/logout/">Log Out</a></li>
                  </ul>
                </div>
              }
              {this.state.isHelpOpen &&
                <div className="target-help-content" ref={node => { this.node = node; }}>
                  {this.props.helpPages && this.props.helpPages.length > 0 &&
                  <ul>
                    {this.props.helpPages.map((helpPage, i) =>
                      <li className="help-item" key={i}>
                        <a target="_blank" href={helpPage.value.indexOf("http")>-1 ? helpPage.value : "#"+helpPage.value}>{helpPage.label}</a>
                      </li>
                    )}
                  </ul>
                  }
                </div>
              }
            </div>
          </div>
        </div>

        <div className="header-block">
          <nav role="navigation" className="global-menu">
           {this.props.menu}
          </nav>
        </div>
      </div>
     )
   }
}
export default Header
