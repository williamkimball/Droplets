// ./contexts/GlobalState.js
import React, { Component, useEffect, useContext } from 'react';
const GlobalState = React.createContext([{}, () => {}]); 
export default GlobalState;