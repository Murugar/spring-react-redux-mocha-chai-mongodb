/**
 * http://usejsdoc.org/
 */
import expect from 'expect'
import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import {createMemoryHistory, IndexRedirect, Redirect, Router, Route} 
  from 'react-router'

describe('Redirect Route', function () {

  let node
  beforeEach(function () {
    node = document.createElement('div')
  })

  afterEach(function () {
    unmountComponentAtNode(node)
  })

  it('works', function (done) {
    render((
      <Router history={createMemoryHistory('/notes/5')}>
        <Route path="/messages1/:id" />
        <Redirect from="/notes/:id" to="/messages1/:id" />
      </Router>
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/messages1/5')
      done()
    })
  })

  it('works with relative paths', function (done) {
    render((
      <Router history={createMemoryHistory('/nested/route1')}>
        <Route path="nested">
          <Route path="route2" />
          <Redirect from="route1" to="route2" />
        </Route>
      </Router>
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/nested/route2')
      done()
    })
  })

   it('works with relative paths with param', function (done) {
    render((
      <Router history={createMemoryHistory('/nested/1/route1')}>
        <Route path="nested/:id">
          <Route path="route2" />
          <Route path="route3" />" 
          <Redirect from="route1" to="route2" />
        </Route>
      </Router>
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/nested/1/route2')
      done()
    })
  })
  
  
  it('works with relative paths with param', function (done) {
    render((
      <Router history={createMemoryHistory('/nested/1/route1')}>
        <Route path="nested/:id">
          <Route path="route2" />
          <Route path="route3" />" 
          <Redirect from="route1" to="route3" />
        </Route>
      </Router>
    ), node, function () {
      expect(this.state.location.pathname).toEqual('/nested/1/route3')
      done()
    })
  })

})

describe('IndexRedirect ', function () {

	  let node
	  
	  beforeEach(function () {
	    node = document.createElement('div')
	  })

	  afterEach(function () {
	    unmountComponentAtNode(node)
	  })

	  it('works', function (done) {
	    render((
	      <Router history={createMemoryHistory('/')}>
	        <Route path="/">
	          <IndexRedirect to="/messages" />
	          <Route path="messages" />
	        </Route>
	      </Router>
	    ), node, function () {
	      expect(this.state.location.pathname).toEqual('/messages')
	      done()
	    })
	  })

	})

