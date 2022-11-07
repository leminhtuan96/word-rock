$(document).ready(function () {
    var firebaseConfig = {
        apiKey: "AIzaSyCUMAw3qoZLyx5cBKVMl2lnyBw3AFvUaIA",
        authDomain: "worldrock.firebaseapp.com",
        projectId: "worldrock",
        storageBucket: "worldrock.appspot.com",
        messagingSenderId: "488426414725",
        appId: "1:488426414725:web:93cc44cbde36b93d7e3fec",
        measurementId: "G-3DV9JVK6CD"
    };

    firebase.initializeApp(firebaseConfig);
    const messaging = firebase.messaging();
    messaging
        .requestPermission()
        .then(function () {
            return messaging.getToken()
        })
        .then(function(token) {
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });

            $.ajax({
                url: '/save-token',
                type: 'POST',
                data: {
                    token: token
                },
                dataType: 'JSON',
                success: function (response) {
                    console.log('Token saved successfully.');
                },
                error: function (err) {
                    console.log('User Chat Token Error'+ err);
                },
            });

        }).catch(function (err) {
        console.log('User Chat Token Error'+ err);
    });

    messaging.onMessage(function(payload) {
        console.log(payload)
        const noteTitle = payload.notification.title;
        const noteOptions = {
            body: payload.notification.body,
            icon: payload.notification.icon,
        };
        // new Notification(noteTitle, noteOptions);
    });

});
