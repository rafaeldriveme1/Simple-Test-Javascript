new Test("User Test", function (test) {
    
        test.it("I expect I return a list of users", function (values) {
    
            User.getUsers((resp) => {
    
                values.output = resp.length;
                values.expect = "> 0";
                values.details = resp;
    
                if (values.output) {
    
                    test.ok(test, values);
    
                } else {
    
                    test.fail(test, values);
    
                }
    
            })
    
        });
    
        test.it("I hope I return a list of comments", function (values) {
    
            User.getComments((resp) => {
    
                values.output = resp.length;
                values.expect = "> 0";
                values.details = resp;
    
                if (values.output) {
    
                    test.ok(test, values);
    
                } else {
    
                    test.fail(test, values);
    
                }
    
            })
    
        });
    
    });
    