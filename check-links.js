const fs = require('fs');
const https = require('https');
const http = require('http');

const LINKS = {
  // Drivers
  "Dell": "https://www.dell.com/support/home/fr-fr",
  "HP": "https://support.hp.com/fr-fr/drivers",
  "Lenovo": "https://pcsupport.lenovo.com/fr/fr/products/laptops-and-netbooks",
  "ASUS": "https://www.asus.com/fr/support/",
  "Acer": "https://www.acer.com/fr-fr/support",
  "Microsoft Surface": "https://support.microsoft.com/fr-fr/surface",
  "Toshiba": "https://www.toshiba-lifestyle.com/fr/support",
  "Fujitsu": "https://www.fujitsu.com/fr/support/products/computing/",
  "NVIDIA": "https://www.nvidia.com/fr-fr/drivers/",
  "AMD": "https://www.amd.com/fr/support/download/drivers.html",
  "Intel": "https://www.intel.com/content/www/fr/fr/support/detect.html",
  "Realtek": "https://www.realtek.com/en/component/zoo/category/network-interface-controllers-10-100-1000m-gigabit-ethernet-pci-express-software",

  // Applications
  "Office 2013": "https://officeredir.microsoft.com/r/rlidO15C2RMediaDownload?p1=db&p2=en-US&p3=ProfessionalRetail",
  "Office 2016": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/ProfessionalRetail.img",
  "Office 2019": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/Professional2019Retail.img",
  "Office 2021": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/Professional2021Retail.img",
  "Outlook 2016": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/OutlookRetail.img",
  "Outlook 2019": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/Outlook2019Retail.img",
  "Outlook 2021": "https://officecdn.microsoft.com/db/492350F6-3A01-4F97-B9C0-C7C6DDF67D60/media/en-US/Outlook2021Retail.img",

  // Outils Techniques
  "CodyDesk": "https://si-one.com/exe/codydesk.exe",
  "Ninite": "https://ninite.com/7zip-adoptjavax8-anydesk-chrome-firefox/ninite.exe",
  "PDF Gear": "https://www.pdfgear.com/fr/download/",
  "IP Scanner": "https://download.advanced-ip-scanner.com/download/files/Advanced_IP_Scanner_2.5.4594.1.exe",
  "Revo Uninstaller": "https://revouninstaller.b-cdn.net/ruf270/revosetup.exe",

  // VPN & Sécurité
  "FortiClient": "https://filestore.fortinet.com/forticlient/downloads/FortiClientVPNInstaller.exe",
  "OpenVPN": "https://swupdate.openvpn.org/community/releases/OpenVPN-2.7.4-I002-amd64.msi",

  // Imprimantes
  "Konica Universal Driver": "https://dl.konicaminolta.eu/fr/?tx_kmdownloadproxy_downloadproxy[fileId]=66cf82ed0d25ac0eef3cf25f60e5d97b&tx_kmdownloadproxy_downloadproxy[documentId]=129692&tx_kmdownloadproxy_downloadproxy[system]=KonicaMinolta&tx_kmdownloadproxy_downloadproxy[language]=FR&type=1558521685",
  "Ricoh C2000 Driver": "https://support.ricoh.com/bb/pub_e/dr_ut_e/0001344/0001344034/V23200/driver_web_installer.exe"
};

function checkUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    protocol.get(url, { timeout: 5000 }, (res) => {
      resolve(res.statusCode < 400);
    }).on('error', () => {
      resolve(false);
    }).on('timeout', () => {
      resolve(false);
    });
  });
}

async function checkAllLinks() {
  const results = {};
  for (const [name, url] of Object.entries(LINKS)) {
    results[name] = await checkUrl(url);
    console.log(`${name}: ${results[name] ? '✅ Valide' : '❌ Invalide'}`);
  }
  fs.writeFileSync('links-status.json', JSON.stringify(results, null, 2));
  console.log('Fichier links-status.json généré.');
}

checkAllLinks();
