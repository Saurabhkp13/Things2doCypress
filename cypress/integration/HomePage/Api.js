/// <reference types="Cypress" />

describe('Example to demonstrate API Testing in cypress', function () {

    //Get Method For All in One
    it('Get Method: Check all get Methods', () => {

        ///Profile check
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/profile'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('status', 'Authorization Token not found')

        })
 
       
        
        /// Wishlist check
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/Standard/wishlist'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('status', 'Authorization Token not found')

        })



        ///Product filters
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/product/filters/standard/Mumbai'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.sub_locality[0].sub_locality).to.eq('Andheri')
            expect(response.body.price_range[0].ranges.min).to.eq(0)
            expect(response.body.price_range[1].ranges.min).to.eq(1000)

        })

        ///Related Products
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/EXPERIENCE/related-products/13'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.related_product[0].details.title).to.include('Camp in the Wild')
            expect(response.body.related_product[0].details.city).to.include('Mumbai')

        })

        ///Price Range
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/product/filters/standard/Mumbai'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.price_range[0].ranges.min).to.eq(0)
            expect(response.body.sub_locality[0].sub_locality).to.include('Andheri')
            expect(response.body.sub_locality[1].sub_locality).to.include('Vileparle')
        })

        //Banners
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/Mumbai/banners/Standard/Top'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.data[0].product_type).to.include('STANDARD')
            expect(response.body.data[0].order).to.eq('1')
        })

        //Trending
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/Pune/EXPERIENCE/trending/Top/0'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.data.links[1].url).to.include('https://api.things2.do/api/Pune/EXPERIENCE/trending/Top/0?page=1')
        })

        //Popular Products
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/Pune/EXPERIENCE/trending/Top/0'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.data.links[1].url).to.include('https://api.things2.do/api/Pune/EXPERIENCE/trending/Top/0?page=1')
        })

        //Just arrived in town
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/Mumbai/Standard/just-arrived-in-town'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.data.current_page).to.eq(1)
            expect(response.body.data.data[0].title).to.include('MoMo Cafe - Courtyard By Marriott')
            expect(response.body.data.data[0].regular_price).to.eq(1000)


        })


        //search result
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/mumbai/Standard/search/bounce'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('type', 'success')
            expect(response.body.data.current_page).to.eq(1)
            expect(response.body.data.data[0].title).to.include('Bounce')
            expect(response.body.data.data[0].regular_price).to.eq(2743)

        })


        //Customer Location
        cy.request({
            method: 'GET',
            url: 'https://api.things2.do/api/customer/location/'

        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body).to.have.property('countryCode', 'IN')
            expect(response.body).to.have.property('countryName', 'India')
            expect(response.body).to.have.property('city', 'Mumbai')

        })


    })



    //POST Method
    it("Status Code and Header Validation Using Get Method", () => {
        cy.request("https://jsonplaceholder.typicode.com/posts/").as('res')
            .its('status')
            .should('equal', 200);

        cy.get('@res')
            .its('headers')
            .its('content-type')
            .should('include', 'application/json; charset=utf-8');

    });

    //POST Method
    it("Create an Employee Using Post Method and Check its Response", () => {

        cy.request({
            method: "POST",
            url: "https://reqres.in/api/users",
            body: {
                "name": "test",
                "salary": "123",
                "age": "23"
            }
        })
            .its('status')
            .should('equal', 201)

        cy.request({
            method: 'GET',
            url: 'https://reqres.in/api/users/2'

        }).then((response) => {
            expect(response.body).has.property('data').has.property("email", "janet.weaver@reqres.in")
            console.log(response);
        })
    })


})



