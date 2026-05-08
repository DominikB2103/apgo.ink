import React from 'https://esm.sh/react@18.2.0';import{createRoot}from'https://esm.sh/react-dom@18.2.0/client';import{Home}from'./pages/Home.jsx';import{Demos}from'./pages/Demos.jsx';import{Demo}from'./pages/Demo.jsx';import{Legal}from'./pages/Legal.jsx';import{NotFound}from'./pages/NotFound.jsx';
const route=window.__APTO_ROUTE||'home';
function App(){if(route==='home')return <Home/>;if(route==='demos')return <Demos/>;if(route.startsWith('demos/'))return <Demo slug={route.split('/')[1]}/>;if(route==='impressum')return <Legal type="impressum"/>;if(route==='privacy')return <Legal type="privacy"/>;return <NotFound/>}
createRoot(document.getElementById('root')).render(<App/>);
