import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'
import { injectGlobal } from 'styled-components'

import { Box as NativeBox } from '../src/native'
import { Box as WebBox } from '../src/web'

import renderTests from './render'

// eslint-disable-next-line
injectGlobal`
  html, body {
    font-family: 'Roboto Mono';
  }

  ::-webkit-scrollbar-track
  {
  	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar
  {
  	width: 6px;
  	background-color: #F5F5F5;
  }

  ::-webkit-scrollbar-thumb
  {
  	background-color: #000000;
  }
`

const web = renderTests({ Box: WebBox })
const native = renderTests({ Box: NativeBox })

render(
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="web/horizontal" component={web.Horizontal} />
      <Route path="web/horizontal-columns" component={web.HorizontalColumns} />
      <Route path="web/stacked" component={web.Stacked} />
      <Route path="web/stacked-alignment" component={web.StackedAlignment} />
      <Route path="web/standalone" component={web.Standalone} />
      <Route path="web/position" component={web.Position} />

      <Route path="native/horizontal" component={native.Horizontal} />
      <Route path="native/horizontal-columns" component={native.HorizontalColumns} />
      <Route path="native/stacked" component={native.Stacked} />
      <Route path="native/stacked-alignment" component={native.StackedAlignment} />
      <Route path="native/standalone" component={native.Standalone} />
      <Route path="native/position" component={native.Position} />
    </Route>
  </Router>,
  document.getElementById('root'),
)
