new Test("Calculator Test", function (test) {

    test.it("I expect the sum of 1 + 1 equals 2", function (values) {

        values.output = Calculate.sum(1, 1);
        values.expect = 2;

        if (values.output == values.expect) {

            test.ok(test, values);

        } else {

            test.fail(test, values);

        }

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
