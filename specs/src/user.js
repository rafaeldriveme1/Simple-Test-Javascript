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

