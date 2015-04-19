var Bootstrap = {
    authToken: "",
    getAuthenticityToken: function() {
        this.authToken = $("input[name='authenticity_token']").val();
    },

    addAnswerBoxListener: function() {
        $(".container-wide").on("click", ".answer-linkBox a[href$='reply']", function(e) {
            var container = $(this).closest(".questionBox");
            var askId = container.prop('id').replace("inbox_question_", "");
            return false;
        });
    }
}

Bootstrap.getAuthenticityToken();
Bootstrap.addAnswerBoxListener();
