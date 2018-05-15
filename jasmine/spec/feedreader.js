/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are placed within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */

/* For this tests I used Jasmine-jquery library, since It provides 
some interessant matchers to work with*/

$(function() {
    /*First test suite. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have correct url defined', function(){
            allFeeds.forEach(function(item){
                expect(item.url).toBeDefined();
                expect(item.url.length).not.toBe(0);
            });
         });


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('should have no empty name and should be defined', function(){
            allFeeds.forEach(function(item){
                expect(item.name).toBeDefined();
                expect(item.name.length).not.toBe(0);
            });
         });
    });


    /* Second test suite. This suite refers to the Menu element. */
    describe('The Menu', function() {

       
        /* This first test ensures the menu element is
         * hidden by default.*/
         
        var body = $("body"); 
        it('should be hidden by default', function() {
            var body = $("body");
            expect(body).toHaveClass('menu-hidden'); /*if the body has a class 'menu-hidden' when page loads*/
        });                                          /* a css transformation hides the menu (css line:79)


         /* This test ensures the menu changes
          * visibility when the menu icon is clicked. The menu must 
          display when clicked and hides when clicked again.*/
          
        it('should change visibility when the icon is clicked', function(){
            var body = $("body");
            var menuBtn = $(".menu-icon-link");

            menuBtn.click();  // we use the click event defined on app.js line:119
            expect(body).not.toHaveClass('menu-hidden'); //a click should remove the class 'menu-hidden'

            menuBtn.click();                                 /*at this state when we click again, the 'menu-hidden' */
            expect(body).toHaveClass('menu-hidden');         /*class should be added to the body element.*/
        });
    }); 

    /*Third test suite. This suite will focus on the feed entries */
    /*Note that the loadfeed() function is asynchronous.*/

    describe('Initial Entries', function(){
              
        beforeEach(function(done){                /*We need to load the asynchronous function*/
            loadFeed(0, function(){           /*before we run our test, and wait for it to be 'fully' executed*/
                
                done();                         
            });
        });

        /* This test ensures that when the loadFeed
         * function is called and has completed its work that there is at least
         * a single .entry element within the .feed container.*/
        
        it('should have at least one non empty entry', function(done){
            
            var feedEntry = $('.feed').find('.entry');
            expect(feedEntry).not.toHaveLength(0);
            done();
        });

        /* This test will ensure each feeds' titles are different when the loadfeed() function is loaded*/

        it('should have non empty and different titles', function(){
            var entryTitle = $(".entry h2");

            entryTitle.each(function(index){                            
            expect($(this).text().length).not.toHaveLength(0);   
            });
        })
     });

    /* Fourth test suite. It will focus on the new feeds */

    describe('New Feed Selection', function(){
        beforeEach(function(done){                                          /*The loadfeed() function is asynchronous*/
            $('.feed').empty();                                             /*we must load it before we run our tests*/
            loadFeed(0, function(){
                var previousEntry = $('.entry').children().text();        /*we load our first feed and assign it to a variable*/
                done();
            });
        });

    
        /* This test ensures, when a new feed is loaded 
         by the loadFeed function, that the content actually changes.*/

         
        it('should change content when a new feed is loaded', function(done){
            var previousEntry = $('.entry').children().text();
            loadFeed(1, function(){                                 /*here we load our second feed, and assign it to a variable*/
                var newEntry = $('.entry').children().text();
                expect(previousEntry).not.toEqual(newEntry);        /*then we just need to compare our two variables. The feeds must be different*/
                done();                                              /*so the values of the variables must not be equal*/
            });
        });
    });
}());
