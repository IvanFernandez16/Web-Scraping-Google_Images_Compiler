const puppeteer = require("puppeteer");

function google_Images(search) {
  (async () => {
    const browser = await puppeteer.launch({
      headless: false /*, slowMo: 50*/,
    });
    const page = await browser.newPage();
    await page.goto("https://www.google.com/");

    // Selectors----------------------------------------------------------------------------------
    const google_Imput =
      "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.RNNXgb > div > div.a4bIc > div";
    const google_Imput_Submit =
      "body > div.L3eUgb > div.o3j99.ikrT4e.om7nvf > form > div:nth-child(1) > div.A8SBwf > div.FPdoLc.lJ9FBc > center > input.gNO89b";
    const google_Image_Button =
      "#hdtb-msb > div:nth-child(1) > div > div:nth-child(2) > a";
    const google_Img =
      "#islrg > div.islrc > div > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img ";
    const show_More_Button =
      "#islmp > div > div > div > div.gBPM8 > div.qvfT1 > div.YstHxe > input";
    const page_End =
      "#islmp > div > div > div > div.gBPM8 > div.qvfT1 > div.DwpMZe > div.K25wae > div.OuJzKb.Yu2Dnd > div";

    //Scrapping start-----------------------------------------------------------------------------
    await page.waitForSelector(google_Imput);
    await page.click(google_Imput);
    await page.type(google_Imput, search);
    await page.click(google_Imput_Submit);
    await page.waitForSelector(google_Image_Button);
    await page.click(google_Image_Button);
    await page.waitForSelector(google_Img);
    /*---------------------------------------------------------------------------------------

   *TO DO logic:
  
      1- scrolldown , 2- if show_More_Button shows up, 3-click it , 4-then scrolldown continues until
      5- page_end shows up. 6-End scrolldown.7-Then recover urls, 8-travel trough them and 9- save pics*

      In some searchs the "show_more_button" doesn´t shows up, in that case the program have to ignore that 
      task and keep scrolling until step 5-(page_end show up)

  
    -------------------------------------------------------------------------------------------
     (This function scrollsdown until bottom)*/

    async function scroll() {
      await page.evaluate(() => {
        window.scrollBy(0, window.innerHeight);
      });
    }
    /* With scroll_max function I achieved to recover all pictures.Althought if "Show_more_button appears" the scroll stops 
    and the program starts to saving the pictures  
    
    So its works but its not what i actually want.*/

    //Scroll max  function do a big scrolldown
    async function scroll_max(number) {
      var number = number;
      number++;
      console.log("scroll number: " + number);
      await scroll();
      await page.waitForTimeout(200);
      number++;
      console.log("scroll number: " + number);
      await scroll();
      await page.waitForTimeout(200);
      number++;
      console.log("scroll number: " + number);
      await scroll();
      await page.waitForTimeout(200);
      number++;
      console.log("scroll number: " + number);
      await scroll();
      await page.waitForTimeout(200);
      number++;
      console.log("scroll number: " + number);
      await scroll();
      await page.waitForTimeout(200);
    }
    //You can repeat the function depending the ammount of results you obtain form the search
    await scroll_max(0);
    await scroll_max(5);
    await scroll_max(10);
    await scroll_max(15);
    await scroll_max(20);
    await scroll_max(25);
    await scroll_max(30);
    await scroll_max(35);
    await scroll_max(40);
    await scroll_max(45);
    await scroll_max(50);
    await scroll_max(55);
    await scroll_max(60);

    // Recover all the images´ urls

    const images_URLs = await page.evaluate(() => {
      const google_Img =
        "#islrg > div.islrc > div > a.wXeWr.islib.nfEiy > div.bRMDJf.islir > img";
      const images = document.querySelectorAll(google_Img);
      const links = [];
      for (let image of images) {
        links.push(image.src);
      }
      return links;
    });

    //Images_URl´s creation check
    console.log("\n Images_URLs´ array created \n");

    //fullpage screenshot
    await page.screenshot({
      path: "scrapping/scraptestgoogle/img/fullpage.jpg",
      fullPage: true,
    });

    //picture travel trough and recovering
    try {
      var adder = 0;
      for (let image_url of images_URLs) {
        adder++;
        await page.goto(image_url);
        // TO DO : download image instead of screenshot´em---------------------------
        await page.screenshot({
          path: "scrapping/scraptestgoogle/img/Picture " + adder + ".jpg",
        });
        console.log("\n Pic nª" + adder + " saved ");
      }
    } catch (error) {
      console.log("\n UPS! I cant load from photo nª " + adder + " onwards");
      await browser.close();
    }
    await browser.close();
  })();
}

google_Images("leopard");
