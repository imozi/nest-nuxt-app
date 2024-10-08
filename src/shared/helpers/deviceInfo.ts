import { Request } from 'express';
import { UAParser } from 'ua-parser-js';

export const deviceInfo = (req: Request) => {
  const userAgentString = req.headers['user-agent'];
  const parser = new UAParser();
  const uaResult = parser.setUA(userAgentString).getResult();

  const ip = req.headers['x-forwarded-for'] || req.ip || req.socket.remoteAddress;

  console.log(uaResult);

  return {
    ip,
    ua: uaResult.ua,
    description: {
      browser: {
        name: uaResult.browser.name,
        version: uaResult.browser.version,
      },
      os: {
        name: uaResult.os.name,
        version: uaResult.os.version,
      },
      device: {
        vendor: uaResult.device.vendor || 'unknown',
        model: uaResult.device.model || 'unknown',
        type: uaResult.device.type || 'desktop',
      },
    },
  };
};
