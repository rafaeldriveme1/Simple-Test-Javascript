/*
Semaphore Javascript Test
Do your TDD tests in a simpler way
Created By Rafael Cruz
Contact: rafaeldriveme@gmail.com
Version: 0.0.1
Release: 25/02/2018
Framework JavaScript
Brazil, São Paulo
*/

/*
The MIT License (MIT)
......................................................................................................
Permission is hereby granted, free of charge, to any person obtaining a copy of this software 
and associated documentation files (the "Software"), to deal in the Software without restriction, 
including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, 
subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial 
portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT 
LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. 
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, 
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE 
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

window.total_tests_oks = 0;
window.total_tests_fails = 0;
window.total_tests = 0;

var app = {
    methods: {
        status: function(){

            var html = `
            <div id="status">
                <ul>
                    <li class="total-tests">
                        Tests total: <span>0</span>
                    </li>
                    <li class="success-tests">
                        Successes: <span>0</span>
                    </li>
                    <li class="fails-tests">
                        Fails: <span>0</span>
                    </li>
                </ul>
            </div>
            `;

            $(".wrapper-test").prepend(html);

        },
        hideAllTest: function(){
            
            $(".table-test .test-it").hide();
            
        },
        showAllTest: function(){

            $(".table-test .test-it").show();

        },
        showTestsOks: function(){

            this.hideAllTest();

            $(".table-test .test-it.test-ok").show();
            
        },
        showTestsFails: function(){

            this.hideAllTest();

            $(".table-test .test-it.test-fail").show();
                        
        }

    },
    events: function(){

        $("body").on("click", "a.see-details", function(e){

            e.preventDefault();

            $(".details").hide();

            $(this).parents("tr").find(".details").toggle();

        });

        $("body").on("click", "li.total-tests", function(e){
            
            app.methods.showAllTest();

        });

        $("body").on("click", "li.success-tests", function(e){
            
            app.methods.showTestsOks();

        });

        $("body").on("click", "li.fails-tests", function(e){
            
            app.methods.showTestsFails();

        });
        
    },
    init: function(){
        
        this.methods.status();
        this.events();

    }
}

app.init();

class Test {

    constructor(description_test, fn) {

        if (!description_test) return;

        this.target = $("#app-test");
        this.description_test = description_test;
        this.test_class = this.rewrite(description_test);
        
        this.insertTest(description_test);

        fn(this);

    }

    rewrite(str) {

        if (!str) return;

        return str.toLowerCase().trim()
            .replace(/[áàãâä]/g, "a")
            .replace(/[éèẽêë]/g, "e")
            .replace(/[íìĩîï]/g, "i")
            .replace(/[óòõôö]/g, "o")
            .replace(/[úùũûü]/g, "u")
            .replace(/ç/g, "c")
            .replace(/(\ |_)+/, " ")
            .replace(/(^-+|-+$)/, "")
            .replace(/[^a-z0-9]+/g, '-');

    }

    testHtmlTable() {

        if (!this.description_test) return;

        return `
        <table class="table-test ${this.test_class}" style="width:100%">
            <tbody>
                <tr class="description-test">
                <th colspan="3">${this.description_test}</th>
                </tr>
            </tbody>  
        </table>`;
    }

    testLineHtmlTable(value, type_result, details) {

        if (!value.description_it || !value || !type_result) return;

        var type = (type_result == 'ok') ? '<i class="fa fa-check-circle" aria-hidden="true"></i>' : '<i class="fa fa-times-circle" aria-hidden="true"></i>';
        details = (details) ? JSON.stringify(details) : "Not details";

        return `
        <tr class="test-it test-${type_result}">
            <td colspan="3">
            <h3>${type} ${value.description_it}</h3>
            <div class="info"><b>output:</b> ${value.output} - <b>expect:</b> ${value.expect} - <b><a href="" class="see-details">see details</a></b></div>
            <div class="details">${details}</div>
            </td>
        </tr>`;
    }

    insertTest(description) {

        if (!description) return;

        this.appendContentTest(this.testHtmlTable(description));

    }

    appendContentTest(html) {

        this.target.prepend(html);

    }

    appendContentItTest(test, html) {

        $("." + test.test_class + ' tbody').append(html);

    }

    countTest(type, count) {

        if (!type) return;

        $(type).find("span").text(count);

    }

    it(description_test, fn) {

        if (!description_test) return;

        this.description_it = description_test;

        window.total_tests++;

        this.countTest(".total-tests", window.total_tests);

        fn({
            "description_it": this.description_it 
        });

    }

    fail(test, value) {

        if (!test && !value) return;

        var details = value.details || "";

        this.appendContentItTest(test, this.testLineHtmlTable(value, "fail", details));

        window.total_tests_fails++;
        
        this.countTest(".fails-tests", window.total_tests_fails);

    }

    ok(test, value) {

        if (!test && !value) return;

        var details = value.details || "";

        this.appendContentItTest(test, this.testLineHtmlTable(value, "ok", details));

        window.total_tests_oks++;

        this.countTest(".success-tests", window.total_tests_oks);

    }

}
