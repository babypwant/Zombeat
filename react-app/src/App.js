import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import Home from './components/Home';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Playlist from './components/Playlist';
import Dashboard from './components/Dashboard';
import EditPlaylist from './components/EditPlaylist';
import Timer from './components/Timer';
import EditTimer from './components/EditTimer';
import FeaturedPlaylist from './components/FeaturedPlaylist';
import AddToPlaylist from './components/AddToPlaylist';
import { authenticate } from './store/session';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state?.token?.token?.access_token)
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);



  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/' exact={true} >
          <Home />
        </Route>
        <ProtectedRoute path='/new/playlist'>
          <Playlist />
        </ProtectedRoute>
        <ProtectedRoute path='/dashboard' exact={true}>
          <Dashboard />
        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/playlist/:id'>
          <EditPlaylist />
        </ProtectedRoute>
        <ProtectedRoute path='/new/timer' exact={true}>
          <Timer />
        </ProtectedRoute>
        <ProtectedRoute path='/edit/timer/:id' exact={true}>
          <EditTimer />
        </ProtectedRoute>
        <ProtectedRoute path='/featured/:id' exact={true}>
          <FeaturedPlaylist />
        </ProtectedRoute>
        <ProtectedRoute path='/add/:id' exact={true}>
          <AddToPlaylist />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
