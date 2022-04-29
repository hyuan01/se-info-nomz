from selenium import webdriver
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from time import sleep

#chrome_service = Service(ChromeDriverManager(chrome_type=ChromeType.CHROMIUM).install())

chrome_options = Options()
chrome_options.add_extension('src.crx')
options = [
    #"--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    #"--disable-extensions",
    "--no-sandbox",
    #"--disable-dev-shm-usage"
]
for option in options:
    chrome_options.add_argument(option)

driver = webdriver.Chrome('./chromedriver/chromedriver.exe', options = chrome_options)

driver.get('https://google.com')
sleep(3)
driver.get('https://youtube.com')
sleep(3)
print(driver.title)