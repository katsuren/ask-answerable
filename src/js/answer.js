var Bootstrap = {
    authToken: "",
    getAuthenticityToken: function() {
        this.authToken = $("input[name='authenticity_token']").val();
    }
}

Bootstrap.getAuthenticityToken();
