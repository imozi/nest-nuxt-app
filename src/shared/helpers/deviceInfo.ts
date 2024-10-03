import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export const deviceInfo = (req: Request) => {
  const userAgentString = req.headers['user-agent'];
  const parser = new UAParser();
  const uaResult = parser.setUA(userAgentString).getResult();

  const ipAddress = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;

  return {
    ipAddress,
    browser: {
      name: uaResult.browser.name,
      version: uaResult.browser.version,
    },
    os: {
      name: uaResult.os.name,
      version: uaResult.os.version,
    },
    device: {
      vendor: uaResult.device.vendor || 'Unknown', // Вендор устройства (Apple, Samsung)
      model: uaResult.device.model || 'Unknown', // Модель устройства
      type: uaResult.device.type || 'desktop', // Тип устройства (mobile, tablet, desktop)
    },
  };
};
