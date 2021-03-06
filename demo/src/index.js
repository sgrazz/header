import React from 'react'
import {render} from 'react-dom'

import './uikit.css'
import './base.css'

import Header from '../../src'

// window.IS_STAFF = true

let Demo = React.createClass({
  render() {

    let otherInfo=[]
    let h1 =  {"label":"org size", "value":"20"}
    let h2 = {"label":"date of registration", "value":"25/11/2017"}
    let h3 = {"label":"year with company", "value":"2 years"}
    let h4 = {"label":"org size", "value":"20 people"}
    otherInfo.push(h1)
    otherInfo.push(h2)
    otherInfo.push(h3)
    otherInfo.push(h4)

    let otherLinks=[]
    let l1 = {"label":"Client Page", "value":"/"}
    let l2 = {"label":"Client Detail", "value":"/detail"}
    let l3 = {"label":"Client Profile", "value":"/profile"}

    otherLinks.push(l1)
    otherLinks.push(l2)
    otherLinks.push(l3)

    return <div className="uikit-body">
      <Header
        menu={
          <ul>
            <li><a href="#/">Home</a></li>
            <li><a href="#/menu1">Menu 1</a></li>
            <li><a href="#/menu2">Menu 2</a></li>
            <li><a href="#/menu3">Menu 3</a></li>
            <li><a href="#/menu4">Menu 4</a></li>
          </ul>
        }
        name="Heading"
        userName="Demo User"
        abn="abn1234"
        logonId="demo.user@gmail.com"
        orgName="Organisation Name"
        otherInfo={otherInfo}
        otherLinks={otherLinks}
        showInbox={true}
        unreadCount="500"
      />
    </div>
  }
})

render(<Demo/>, document.querySelector('#demo'))
