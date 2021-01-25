$(document).ready(function() {
    console.log("Ready!");


    // Manage edit-name-button text
    $('#edit-name').on('hide.bs.collapse', function() {
        $('a.edit-name-button').html("Edit");
    });
    $('#edit-name').on('show.bs.collapse', function() {
        $('a.edit-name-button').html("Close");
    });


    // Register and validate password
    $("#submit-button").click(function(event) {
        var pass = $("#pass").val();
        var confirmation = $("#confirmation").val();
        var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,32}$/;
        if (!pass.match(regex)) {
            event.preventDefault();
            alert("Password must be 8-32 characters long and contain at least one number and one special character.");
        } else if ($("#pass").val() != $("#confirmation").val()) {
            event.preventDefault();
            alert("Password and confirmation do not match. Please re-enter them and try again.");
        }
    });


    // Resend validation email
    $("#verify-button").click(function(event) {
        event.preventDefault();
        $.post("/verify", {})
            .done(function(response) {
                console.log(response);
                $("#verify-button").html("Verification email sent");
                $("#verify-button").css('pointer-events', 'none');
                $("#verify-button").addClass("text-muted");
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Add note
    $("button.add-note-button").click(function() {
        $.post("/add_note", $("#add-note-form").serialize())
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Delete note
    $("button.delete-note-button").click(function() {
        $.post("/delete_note", {
                "note_id": $(this).data("note")
            })
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Send message
    $("button.send-message-button").click(function() {
        $.post("/send_message", $("#send-message-form").serialize())
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Delete message
    $("button.delete-message-button").click(function() {
        $.post("/delete_message", {
                "message_id": $(this).data("message")
            })
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Hide sent message
    $("button.hide-sent-message-button").click(function() {
        $.post("/hide_sent_message", {
                "message_id": $(this).data("message")
            })
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Change Name
    $("button.change-name-button").click(function() {
        $.post("/change_name", $("#change-name-form").serialize())
            .done(function(response) {
                console.log(response);
                location.reload(true);
            })
            .fail(function(response) {
                console.log(response)
            });
    });


    // Delete account
    $("button.second-delete").click(function() {
        if (confirm("Are you sure you want to delete your account?")) {
            console.log("Deleting account");
            $.post("/delete_account")
                .done(function(response) {
                    console.log(response);
                    location.href = "/";
                })
                .fail(function(response) {
                    console.log(response)
                });
        } else {
            event.preventDefault()
            $("div.delete-account").collapse("hide");
        }

    });


    // Toggle delete button
    $("div.delete-account").on('hide.bs.collapse', function() {
        $("div.account-card").removeClass("border-danger");
        $("div.account-card").addClass("border-secondary");
        $("p.delete-warning").removeClass("text-danger");
        $("button.first-delete").html("Delete account");
    });
    $("div.delete-account").on('show.bs.collapse', function() {
        $("div.account-card").removeClass("border-secondary");
        $("div.account-card").addClass("border-danger");
        $("p.delete-warning").addClass("text-danger");
        $("button.first-delete").html("Hide the red button!");
    });

});
