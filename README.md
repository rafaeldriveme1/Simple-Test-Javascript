![Screenshot](logo.jpg)

Do your TDD tests in a simpler way

### Requirements
Jquery
Nodejs

### Install
Create a file .html
``` html 
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:vtex="http://www.vtex.com.br/2009/vtex-common" xmlns:vtex.cmc="http://www.vtex.com.br/2009/vtex-commerce" lang="pt-BR">
	<head>
		<title>Semaphore | Do your TDD tests in a simpler way</title>
		<!-- Semaphore -->
		<link href="../dist/semaphore.jstest.min.css" rel="stylesheet" type="text/css" />
		<!-- / Semaphore -->
	</head>
	<body>
		
		<!-- Semaphore element -->
		<div class="wrapper-test">
			<div id="app-test"></div>		
		</div>
		<!-- Semaphore element -->

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
		<script src="./src/calculate.js"></script>
		<script src="./src/user.js"></script>

		<!-- Semaphore -->
		<script src="../dist/semaphore.jstest.min.js"></script>
		<script src="./CalculatorTest.js"></script>
		<script src="./UserTest.js"></script>
		<!-- / Semaphore -->

	</body>
</html>
```

### Server Run
**Install packages:**
npm install

### Video
http://take.ms/5NRHy

**Run:**
npm run start or gulp

**Browser:**
http://localhost:8080/specs/

### Test file

```javascript
// Calculate.js
var Calculate = {
	sum: function(num1, num2){
		if(!num1 || !num2) return false;
		return parseInt(num1) + parseInt(num2);
	},
	subtraction: function(){
		return null;
	},
	division: function(){
		return null;
	},
	multiplication: function(){
		return null;
	}
}

// CalculatorTest.js
new Test("Calculator Test", function (test) {
    test.it("I expect the sum of 1 + 1 equals 2", function (values) {
        values.output = Calculate.sum(1, 1);
        values.expect = 2;

        if (values.output == values.expect) {
            test.ok(test, values);
        } else {
            test.fail(test, values);
        
    });

    test.it("I expect the sum of 1 + null to be equal to false", function (values) {
        values.output = Calculate.sum(1, null);
        values.expect = false;

        if (values.output == values.expect) {
            test.ok(test, values);
        } else {
            test.fail(test, values);
        }
    });

    test.it("I expect the sum of '1' + '1' equals 2", function (values) {
        values.output = Calculate.sum('1', '1'); // string params
        values.expect = 2;

        if (values.output == values.expect) {
            test.ok(test, values);
        } else {
            test.fail(test, values);
        }
    });

});

```

### Test with ajax

```javascript
// User.js
var User = {
    getUsers: function (fn) {
        $.get("https://jsonplaceholder.typicode.com/users", function (r) {
            fn(r);
        });
    },
    getComments: function (fn) {
        $.get("https://jsonplaceholder.typicode.com/comments/1", function (r) {
            fn(r);
        });
    }
}

// UserTest.js
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

```

## API

Code | Description | Details
--- | --- | --
new Test | Test group initiator | new Test("Test group name", callback);
test | Object returned from test group callback | Object return: {it, ok, fail}
it | Test initiator | it("Test name", callback);
ok | Method that informs that the test passed | ok(test, values);
fail | Method that reports that the test failed | fail(test, values);
values | Object returned from test callback | Object return: {output, expect, details}
output | Output of the test method result | 
expect | Expected test information | 
details | You can be informed of the detail of a test | Use in ajax response
