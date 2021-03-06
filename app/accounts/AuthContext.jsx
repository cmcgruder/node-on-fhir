import React, { useEffect, useState } from 'react';
import { User } from '@accounts/types';
import { accountsClient } from './Accounts';

import { Session } from 'meteor/session';
import { get, has, cloneDeep } from 'lodash';

import { useTracker } from 'meteor/react-meteor-data';

const currentUserDep = new Tracker.Dependency();

if(Meteor.isClient){
  Session.setDefault('currentUser', false);

  Meteor.currentUser = function(){
    return Session.get('currentUser');
  }

  // Meteor.userId = function(){
  //   currentUserDep.depend();
  //   return Session.get('currentUser');
  // }
}

async function fetchUser(setAuthContextState){
  console.log('AuthContext.fetchUser', setAuthContextState)

  const accountsUser = await accountsClient.getUser();
  console.log('AuthContext.accountsUser', accountsUser)

  if(Meteor.isClient){
    Session.set('currentUser', Object.assign({}, accountsUser));
    currentUserDep.changed();
  }

  if(typeof setAuthContextState === "function"){
    setAuthContextState({ 
      loading: false, 
      user: Object.assign({}, accountsUser) 
    });
  }
};

async function loginWithService(service, credentials){
  console.log('AuthContext.loginWithService()', service, credentials);

  let loginResponse = await accountsClient.loginWithService(service, credentials);

  if(Meteor.isClient){
    Session.set('currentUser', get(loginResponse, 'user'));
    currentUserDep.changed();
  }

  // if(typeof setAuthContextState === "function"){
  //   setAuthContextState({ 
  //     loading: false, 
  //     user: Object.assign({}, accountsUser) 
  //   });
  // }

  // let fetchUserResponse = await fetchUser();
  // console.log('fetchUserResponse', fetchUserResponse)  
};

async function logout(){
  console.log('AuthContext.logout()')
  await accountsClient.logout();
  // setState({ loading: false, user: undefined });

  if(Meteor.isClient){
    Session.set('currentUser', false);
    //Session.set('lastUpdated', new Date())

    currentUserDep.changed();
  }
};

// 
const AuthContext = React.createContext({
  fetchUser: fetchUser,
  loginWithService: loginWithService,
  logout: logout
});

const AuthProvider = function({ children }){
  const [state, setState] = useState({ 
    loading: true,
    user: null
  });

  useEffect(() => {
    console.log('AuthContext.useEffect()')
    fetchUser(setState);
  }, []);

  // this is hacky
  setState(useTracker(function(){
    return Session.get('currentUser')
  }, []));

  // If we need to refresh the tokens, it will show a fullscreen loader
  if (state.loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user: state.user, fetchUser, loginWithService, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = function(){
  return React.useContext(AuthContext);
} 


export { AuthProvider, useAuth };