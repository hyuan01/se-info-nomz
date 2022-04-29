from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from time import sleep
import pytest
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

@pytest.fixture()
def setup(request):
    chrome_service = Service(ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install())

    chrome_options = ChromeOptions()
    chrome_options.add_extension('test_src.crx')

    options = [
    "--headless",
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
    for option in options:
        chrome_options.add_argument(option)

    request.cls.driver = webdriver.Chrome(service=chrome_service, options=chrome_options)


    yield request.cls.driver
    request.cls.driver.close()