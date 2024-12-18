import React, { useEffect } from 'react'
import '../styles/auth.css'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/Auth/Login'
import Signup from '../components/Auth/Signup'
import { useHistory } from 'react-router-dom'

const Home = () => {
  const history = useHistory()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

   // if (user) history.push("/chat");
  }, [history]);
  return (
    <div className='home'>
      <div className='container'>
        <div className="head">
          <center>
            Chat App by KP
          </center>
        </div>
        <div className="body">
          <Tabs variant='soft-rounded' colorScheme='darkblue'>
            <TabList>
              <Tab width='50%' _selected={{ color: 'white', bg: 'blue' }}>Login</Tab>
              <Tab width='50%' _selected={{ color: 'white', bg: 'blue' }}>Signup</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Home